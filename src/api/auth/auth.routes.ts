import express from "express";
import { v4 as uuidv4 } from "uuid";
import * as db from "../../database";
import bcrypt from "bcrypt";

const router = express.Router();

/* Login to website */
router.get("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const dbPassword = await db.getUserPassword(email);

        if (await bcrypt.compare(password, dbPassword)) {
            // TODO: Also get name from db if there is a name and store in session cookie

            req.session.user = email;
            res.status(200).send({ "success": "User succesfully logged in." });
        } else {
            res.status(403).send({ "error": "Wrong password." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "error": "Something went wrong while trying to login user." });
    }
});

/* Register a new user */
router.post("/register", async (req, res) => {
    // TODO: Register with confirmation mail
    // TODO: Password checking of het een goed pw is
    // TODO: Als er een name is opgegeven deze ook meegeven in session token.

    if (!req.body.email || !req.body.password) {
        res.status(400).send({ "error": "Fields missing on body." });
    } else {
        try {
            const id = uuidv4();
            const { email, name } = req.body;

            if (!(await db.emailExists(email))) {
                const password = await bcrypt.hash(req.body.password, 10);
                const date = new Date(Date.now());
                const createdAt = [date.getFullYear(), date.getMonth(), date.getDay()].join("/") + " " + [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");

                await db.insertUser(id, email, password, name, createdAt);
                req.session.user = email;
                res.status(200).send({ "success": "New user registered." });
            } else {
                res.status(400).send({ "error": "A user with that email address already exists." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ "error": "Error while trying to register user. " });
        }
        res.end();
    }
});

/* Logout user */
router.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect("/");
});

export default router;