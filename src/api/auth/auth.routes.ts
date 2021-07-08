import express from "express";
import { v4 as uuidv4 } from "uuid";
import * as db from "../../database";

const router = express.Router();

/* Login to website */
router.post("/login", (req, res) => {

});

/* Register a new user */
router.post("/register", async (req, res) => {
    // TODO: Register with confirmation mail

    const id = uuidv4();
    const { email, password, name } = req.body;
    const date = new Date(Date.now());
    const createdAt = [date.getFullYear(), date.getMonth(), date.getDay()].join("/") + " " + [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");

    if (!email || !password) {
        res.status(400).send({ "error": "Fields missing on body." });
    } else {
        try {
            const response = await db.insertUser(id, email, password, name, createdAt);
            res.status(200).send({ "success": "New user registered." });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "Error while trying to register user. "});
        }
    }
});

export default router;