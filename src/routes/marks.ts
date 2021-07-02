import express from "express";
import * as somtoday from "../api/somtoday";

const router = express.Router();

// Get / import grades from som
router.get("/som", async (req, res) => {
    // TODO: opties erin zetten, gemiddelden importeren of alleen de gewone cijfes importeren
    const { school, username, password } = req.body;

    const authorizationData = await somtoday.fetchAuthorization(school, username, password);
    const accessToken: string = await authorizationData?.accessToken;
    const baseURL: string = await authorizationData?.baseURL;

    const userID = await somtoday.getUserID(baseURL, accessToken);
    const grades = await somtoday.getMarks(baseURL, accessToken, userID);

    res.header({ "Content-Type": "application/json" });
    res.send(JSON.stringify(grades));
    res.end();
});

// Get grades from database
router.get("/", (req, res) => {

});

// Post grades to database
router.post("/", (req, res) => {

});
 
export default router;