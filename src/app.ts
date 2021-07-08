import express from "express";
import cors from "cors";
import api from "./api";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.listen(PORT, async () => {
    console.log("Running on port " + PORT);
    // TODO: Server HTTPS maken voor veiligheid
    // TODO: Error handling netjes maken
    // TODO: Promises in somtoday code mooi maken ook met errors
});

app.use("/api/", api);

app.use((req, res) => {
    res.status(404).send({ "error": "Not found, probably using wrong route" });
    res.end();
});