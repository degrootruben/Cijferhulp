import express from "express";
import fetch from "node-fetch";

const router = express.Router();

interface School {
    naam: string,
    uuid: string
}

router.get("/schools", async (req, res) => {
    // TODO: Auth

    let schools: School[] = [];

    try {
        const response = await fetch("https://servers.somtoday.nl/organisaties.json");

        const data = await response.json();

        data[0].instellingen.map((school: School) => {
            schools.push({ naam: school.naam, uuid: school.uuid });
        });

        res.status(200).send({ "success": "Succesfully retrieved schools from SomToday", schools });
    } catch (err) {
        res.status(500).send({ "error": "Something went wrong while fetching schools from SomToday" });
    }
});

router.post("/login", (req, res) => {

});

router.post("/logout", (req, res) => {

});

export default router;