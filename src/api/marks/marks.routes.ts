import express from "express";
import * as somtoday from "../../somtoday";
import * as db from "../../database";

const router = express.Router();

/* Get or import marks from som */
router.get("/som", async (req, res) => {
    const { school, username, password, normal, average, year } = req.body;

    const authorizationData = await somtoday.fetchAuthorization(school, username, password);
    const accessToken: string = await authorizationData?.accessToken;
    const baseURL: string = await authorizationData?.baseURL;

    const userID = await somtoday.getUserID(baseURL, accessToken);
    const marks = await somtoday.getMarks(baseURL, accessToken, userID, { normal, average, year });

    res.header({ "Content-Type": "application/json" });
    res.send(JSON.stringify(marks));
    res.end();
});

/* Get marks from database */
router.get("/", async (req, res) => {
    // TODO: Auth fixen zodat niet iedereen zomaar gegevens kan opvragen door middel van JWT.

    try {
        const response = await db.getMarks(req.body.user_id);
        res.status(200).send({ "marks": response.rows });
    } catch (error) {
        res.status(500).send({ "error": "Something went wrong while trying to get marks from database. "});
    }
});

/* Post marks to database */
router.post("/", async (req, res) => {
    const { mark, weighting, exam_weighting: examWeighting, type, year, period, description, subject, subject_abbreviation: subjectAbbreviation, input_date: inputDate, is_examendossier_resultaat: isExamendossierResultaat, is_voortgangsdossier_resultaat: isVoortgangsdossierResultaat, origin, user_id: userId } = req.body;

    // TODO: UserId nog meegeven + auth checken
    try {
        const response = await db.insertMarks({ mark, weighting, examWeighting, type, year, period, description, subject, subjectAbbreviation, inputDate, isExamendossierResultaat, isVoortgangsdossierResultaat, origin, userId });
        res.status(200).send({ "success": "Mark inserted into database." });
    } catch (error) {
        res.status(500).send({ "error": "Something went wrong while inserting mark to database." });
    }

    res.end();
});

export default router;