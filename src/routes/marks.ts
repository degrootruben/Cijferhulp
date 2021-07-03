import express from "express";
import { appendFile } from "fs";
import * as somtoday from "../api/somtoday";

const router = express.Router();

// Get / import marks from som
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

// Get marks from database
router.get("/", (req, res) => {

});

// Post marks to database
router.post("/", (req, res) => {

});

export default router;