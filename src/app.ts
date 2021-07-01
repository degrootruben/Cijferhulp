import express from "express";
import cors from "cors";
import { fetchAuthorization, getGrades, getUserID } from "./api/somtoday";
import dotenv from "dotenv";
import { appendFile } from "fs";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

var formBody: any = [];

app.listen(PORT, async () => {
    console.log("Running on port " + PORT);
    // TODO: Server HTTPS maken voor veiligheid
    // TODO: Error handling netjes maken
    // TODO: Promises in somtoday code mooi maken ook met errors

    const data = await fetchAuthorization(process.env.SCHOOL, process.env.USERNAME_SOM, process.env.PASSWORD);
    const accessToken: string = await data?.accessToken;
    const baseURL: string = await data?.baseURL;
    const userID = await getUserID(baseURL, accessToken);
    const grades = await getGrades(baseURL, accessToken, userID);
    //console.log(grades);
    let i = 0;
    grades.forEach((grade: any) => {
        appendFile("./res.json", JSON.stringify(grade) + ",", (err) => {
            if (err) throw err;
            console.log("save");
        });
        if (grade.type === "Toetskolom") {
            i++;
            console.log({
                "Vak": grade.vak.naam,
                "Naam": grade.omschrijving,
                "Cijfer": grade.resultaat,
            });
        }
    });
    console.log(i);
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