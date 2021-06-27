import express from "express";

const PORT = process.env.PORT || 8000;
const app = express();

app.listen(PORT, () => {
    console.log("Running on port " + PORT);
});

app.use((req, res) => {
    console.log("Visitor!");
    res.send("Hi!");
    res.end();
});