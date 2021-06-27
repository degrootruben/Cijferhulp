import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.listen(PORT, () => {
    console.log("Running on port " + PORT);
});

app.post("/api/note", (req, res) => {
    console.log(req.body);
    res.send({ "status": "success" });
    res.end();
});

app.use((req, res) => {
    res.send("404 - Deze pagina bestaat niet!");
    res.end();
});