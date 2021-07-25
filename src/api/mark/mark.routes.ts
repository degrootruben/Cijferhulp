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

/* 
    GET /:user_id
    Get marks from database
    
    Route params:
        user_id: id of user whose marks the requester is trying to request

    Requirements:
        session cookie
        proper authentication

*/
router.get("/:user_id", requireLogin, async (req, res) => {
    if (req.params.user_id === req.session.user.user_id) {
        const paramsUserId = req.params.user_id;

        try {
            const response = await db.getMarks(paramsUserId);

            res.status(200).send({ "succes": "Succesfully retrieved marks", "marks": response.rows });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "Something went wrong while trying to get marks from database" });
        }
    } else {
        res.status(401).send({ "error": "You are probably not logged in", "not_logged_in": true });
    }
});

/*
    POST /
    Post mark to database

    Body:
        mark
        weighting: weighting of mark
        exam_weighting: how much the mark weighs for the exams
        type: type of mark, added because of SOMToday
        year: school year where the mark belongs to
        period: school period where the mark belongs to
        description: title / description of mark
        subject: subject the mark belongs to
        subject_abbreviation:
        is_examendossier_resultaat: boolean which tells whether the mark belongs to the 'examdossier'
        is_voortgangsdossier_resultaat: boolean which tells whether the mark belongs to the 'voortgangsdossier'
        origin: where the mark comes from (e.g. SOMToday or webapp)
        user_id: id of the user the mark belongs to

    Requirements:
        session cookie
        proper authentication

*/
router.post("/", requireLogin, async (req, res) => {
    if (req.body.user_id === req.session.user.user_id) {
        const { mark, weighting, exam_weighting: examWeighting, type, year, period, description, subject, subject_abbreviation: subjectAbbreviation, is_examendossier_resultaat: isExamendossierResultaat, is_voortgangsdossier_resultaat: isVoortgangsdossierResultaat, origin, user_id: userId } = req.body;

        const date = new Date(Date.now());
        const inputDate = [date.getFullYear(), date.getMonth(), date.getDate()].join("/") + " " + [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");

        try {
            await db.insertMarks({ mark, weighting, examWeighting, type, year, period, description, subject, subjectAbbreviation, inputDate, isExamendossierResultaat, isVoortgangsdossierResultaat, origin, userId });
            const response = await db.getMarks(userId);
            // TODO: Misschien alleen het ingevoerde cijfer terug krijgen van de database en die terug sturen in response
            // om overhead te voorkomen.
            res.status(200).send({ "success": "Mark inserted into database.", "marks": response.rows });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "Something went wrong while inserting mark to database." });
        }
    } else {    
        res.status(401).send({ "error": "You are probably not logged in", "not_logged_in": true });
    }
});

/*
    DELETE /:id
    Delete a mark from database

    Route params:
        id: id of mark

    Body:
        user_id: id of user preforming request

    Requirements:
        session cookie
        proper authentication

*/
router.delete("/:id", requireLogin, async (req, res) => {
    if (req.body.user_id === req.session.user.user_id) {
        const id: number = parseInt(req.params.id);

        try {
            await db.deleteMark(id);
            const response = await db.getMarks(req.body.user_id);
            res.status(200).send({ "success": "Mark deleted from database", "marks": response.rows });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "Something went wrong while deleting mark from database" });
        }
    } else {    
        res.status(401).send({ "error": "You are probably not logged in", "not_logged_in": true });
    }
});

export default router;