import express from "express";
import cors from "cors";
import marks from "./routes/marks";
import dotenv from "dotenv";
import { appendFile } from "fs";
import start from "./database";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

var formBody: any = [];

app.listen(PORT, async () => {
    console.log("Running on port " + PORT);
    start();
    // TODO: Server HTTPS maken voor veiligheid
    // TODO: Error handling netjes maken
    // TODO: Promises in somtoday code mooi maken ook met errors
});

app.use("/api/marks", marks);

app.post("/api/note", (req, res) => {
    console.log(req.body);
    res.send({ "status": "success" });
    res.end();
});

app.use((req, res) => {
    res.status(404).send(JSON.stringify({ "error": "Not found, probably using wrong route" }));
    res.end();
});