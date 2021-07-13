import express from "express";
import * as somtoday from "../../somtoday";
import * as db from "../../database";
import { requireLogin } from "../../middlewares";

const router = express.Router();

/* Get or import marks from som */
router.post("/som", async (req, res) => {
    const { school, username, password, normal, average, year } = req.body;

    if (!school || !username || !password || !normal || !average || !year) {
        res.status(400).send({ "error": "Fields missing in body" });
        res.end();
    } else {
        try {
            const authorizationData = await somtoday.fetchAuthorization(school, username, password);
            const accessToken: string = await authorizationData?.accessToken;
            const baseURL: string = await authorizationData?.baseURL;

            const userID = await somtoday.getUserID(baseURL, accessToken);
            const marks = await somtoday.getMarks(baseURL, accessToken, userID, { normal, average, year });

            res.status(200).send(JSON.stringify(marks));
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "Something went wrong while trying to fetch marks from SomToday" });
        }
    }
});

/* Get marks from database */
router.get("/:user_id", requireLogin, async (req, res) => {
    // TODO: Auth fixen zodat niet iedereen zomaar gegevens kan opvragen door middel van JWT.
    const paramsUserId = req.params.user_id;

    if (paramsUserId === req.session.user.user_id) {
        try {
            const response = await db.getMarks(req.params.user_id);

            res.status(200).send({ "marks": response.rows });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "Something went wrong while trying to get marks from database" });
        }
    } else {
        res.status(403).send({ "error": "You are probably not logged in", "not_logged_in": true });
    }
});

/* Post marks to database */
router.post("/", async (req, res) => {
    const { mark, weighting, exam_weighting: examWeighting, type, year, period, description, subject, subject_abbreviation: subjectAbbreviation, input_date: inputDate, is_examendossier_resultaat: isExamendossierResultaat, is_voortgangsdossier_resultaat: isVoortgangsdossierResultaat, origin, user_id: userId } = req.body;

    // TODO: UserId nog meegeven + auth checken
    try {
        await db.insertMarks({ mark, weighting, examWeighting, type, year, period, description, subject, subjectAbbreviation, inputDate, isExamendossierResultaat, isVoortgangsdossierResultaat, origin, userId });
        res.status(200).send({ "success": "Mark inserted into database." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": "Something went wrong while inserting mark to database." });
    }
});

export default router;