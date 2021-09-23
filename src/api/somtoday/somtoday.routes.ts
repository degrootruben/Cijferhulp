import express from "express";
import fetch from "node-fetch";
import { requireLogin } from "../../middlewares";
import { fetchAuthorization, getUserID, getMarks } from "../../somtoday";

const router = express.Router();

interface School {
    naam: string,
    uuid: string
}

router.get("/schools", requireLogin, async (req, res) => {
    // TODO: Auth

    let schools: School[] = [];

    try {
        const response = await fetch("https://servers.somtoday.nl/organisaties.json");

        const data = await response.json();

        data[0].instellingen.map((school: School) => {
            schools.push({ naam: school.naam, uuid: school.uuid });
        });

        res.status(200).send({ "success": "Succesfully retrieved schools from Somtoday", schools });
    } catch (err) {
        res.status(500).send({ "error": "Something went wrong while fetching schools from Somtoday" });
    }
});

router.post("/login", requireLogin, async (req, res) => {
    const { uuid, username, password } = req.body;
    console.log(req.body);
    res.end();

    try {
        const auth = await fetchAuthorization(uuid, username, password);
        const userID = await getUserID(auth?.baseURL, auth?.accessToken);
        const marks = await getMarks(auth?.baseURL, auth?.accessToken, userID, { normal: true });

        console.log(marks);

    } catch (err) {
        res.status(500).send({ "error": "Something went wrong while authenticating user with Somtoday" });
    }
});

router.post("/logout", (req, res) => {

});

export default router;