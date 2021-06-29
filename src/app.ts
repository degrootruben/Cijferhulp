import express from "express";
import cors from "cors";
import fetch, { Response } from "node-fetch";
import { writeFileSync } from "fs";
import { getAccesToken } from "./api/somtoday";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const accesToken = "eyJ4NXQjUzI1NiI6ImxZZ2VJNnNQMDY1Um1QTlloZ1dZcmNYcElTNWpidEM5X3V3Z0p0WV8xQVkiLCJraWQiOiJpcmlkaXVtaWRwLTYyNTQ5NDg3Mjc1MzI2NTQwNTcxNDc0NDAzNzAyMzE3NDQ4NTU3IiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJENTBFMEMwNi0zMkQxLTRCNDEtQTEzNy1BOUE4NTBDODkyQzIiLCJzdWIiOiI2OTAxZTg5NS1iODE4LTQ0OWQtOTEwZS04ZGNhMDE4M2NjM2FcXDczMDg1NzNiLTU1NDQtNGUwOS1iN2Q0LTY4ZmI0ZTE0NzQ5NyIsIm5iZiI6MTYyNDk5NjQ4MSwiYWF0IjoxNjI0OTk2NDgxLCJhbXIiOiJwd2QiLCJzY29wZSI6WyJvcGVuaWQiXSwiaXNzIjoiaHR0cHM6XC9cL3NvbXRvZGF5Lm5sIiwidHlwZSI6ImFjY2VzcyIsImV4cCI6MTYyNTAwMDA4MSwiaWF0IjoxNjI0OTk2NDgxLCJqdGkiOiI5ODBmYTkxNy1mNDk1LTQ5Y2EtYjNjMi0xOTQ4ZDg0YzE1ODQ6MjkyMjU3MTg4NjAwMSJ9.kk0g7Gr4YvIIs8gA0A7XezmD-OduSDdE7OpKLjCxpDtulMksPUEjrmMRUrardzIQqcyC3kOeAnOUtAm_lcSa1gYXcCMc_PgMb6vWtSsEZnTJbKw46bYR7f-BXN8YvniYoXjG7Kxz3QXe9b-w46_ALHqHCOpZg_Xp_semEvZ-tbnvj12NRoTBaNtRIBqkd6m5ktZN3WukMpHJANQ1N1fLF3FxoebW0lAanANsV3lrJ18LKWrnds7W9kl8luOpZZxzEU_ymOXZQkKHKVUStp3krzGrIvIMzF1nSic1nf-k2wNwaguek-xUZVEIAxryawAU_GvOENliuc6bHpP9yi-ogw";

var formBody: any = [];

app.listen(PORT, () => {
    console.log("Running on port " + PORT);
    // TODO: Server HTTPS maken voor veiligheid
    getAccesToken(process.env.SCHOOL, process.env.USERNAME_SOM, process.env.PASSWORD).then(accessToken => console.log(accessToken));
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