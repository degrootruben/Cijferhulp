import express from "express";
import cors from "cors";
import api from "./api";
import dotenv from "dotenv";
import sessions from "client-sessions";
import * as db from "./database";
import path from "path";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
}

app.use(express.json());
app.use(sessions({
    cookieName: "session",
    secret: process.env.SESSION_SECRET || "SECRET",
    duration: 120 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    cookie: {
        httpOnly: true,
        // secure: true, // TODO: use only when https
        ephemeral: false
    }
}));

app.use(async (req, res, next) => {
    if (req.session && req.session.user) {
        
        const emailExists = await db.emailExists(req.session.user.email);

        if (emailExists) {
            req.user = req.session.user;
        }

        next();
    } else {
        next();
    }
});

app.use("/api/", api);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

app.use((req, res) => {
    res.status(404).send({ "error": "Not found, probably using wrong route" });
    res.end();
});

app.listen(PORT, async () => {
    console.log("Running on port " + PORT);
    // TODO: Server HTTPS maken voor veiligheid
    // TODO: Error handling netjes maken
    // TODO: Promises in somtoday code mooi maken ook met errors
    // TODO: Vakken importerten vanuit som
});

process.on("exit", () => {
    // TODO: Disconnect from database
});