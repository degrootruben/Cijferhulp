import express from "express";
import { v4 as uuidv4 } from "uuid";
import * as db from "../../database";
import bcrypt from "bcrypt";
import { status } from "../httpStatusCodes";

const router = express.Router();

/* Login to website */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const clientSideError = { "error": "Email or password wrong", "client_side": true };

    try {
        if (!(await db.emailExists(email))) {
            res.status(status.BAD_REQUEST).send(clientSideError);
        } else {
            const dbPassword = await db.getUserPassword(email);

            if (await bcrypt.compare(password, dbPassword)) {
                const userId = await db.getUserId(email);
                const user = { email, user_id: userId };
                req.session.user = user;

                res.cookie("user_id", userId, {
                    signed: false,
                    maxAge: 120 * 60 * 1000,
                    expires: new Date(new Date().setHours(new Date().getHours() + 2)),
                    // TODO: set this when https: secure: true
                });
                res.status(status.OK).send({ "success": "User succesfully logged in" });
            } else {
                res.status(status.BAD_REQUEST).send(clientSideError);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(status.INTERNAL_SERVER).send({ "error": "Something went wrong while trying to login user", "server_side": true });
    }
});

/* Register a new user */
router.post("/register", async (req, res) => {
    // TODO: Register with confirmation mail
    // TODO: Password checking of het een goed pw is
    // TODO: Als er een name is opgegeven deze ook meegeven in session token

    if (!req.body.email || !req.body.password) {
        res.status(status.BAD_REQUEST).send({ "error": "Fields missing on body" });
    } else {
        try {
            const id = uuidv4();
            const { email, name } = req.body;

            if (!(await db.emailExists(email))) {
                const password = await bcrypt.hash(req.body.password, 10);
                const date = new Date(Date.now());
                const createdAt = [date.getFullYear(), date.getMonth(), date.getDate()].join("/") + " " + [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");

                await db.insertUser(id, email, password, name, createdAt);

                const userId = id;
                const user = { email, user_id: userId };
                req.session.user = user;

                res.status(status.OK).send({ "success": "New user registered" });
            } else {
                res.status(status.INTERNAL_SERVER).send({ "error": "A user with that email address already exists" });
            }
        } catch (error) {
            console.error(error);
            res.status(status.INTERNAL_SERVER).send({ "error": "Error while trying to register user" });
        }
    }
});

/* Logout user */
router.get("/logout", (req, res) => {
    req.session.reset();
    res.status(status.OK).send({ "success": "User logged out" });
});

export default router;