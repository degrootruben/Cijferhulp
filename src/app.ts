import express from "express";
import cors from "cors";
import { fetchAuthorization, getMarks, getUserID } from "./api/somtoday";
import marks from "./routes/marks";
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

    // const data = await fetchAuthorization(process.env.SCHOOL, process.env.USERNAME_SOM, process.env.PASSWORD);
    // const accessToken: string = await data?.accessToken;
    // const baseURL: string = await data?.baseURL;
    // const userID = await getUserID(baseURL, accessToken);
    // const marks = await getMarks(baseURL, accessToken, userID);
    // //console.log(Marks);
    // let numberOfMarksFound = 0;
    // marks.forEach((mark: any) => {
    //     appendFile("./res.json", JSON.stringify(mark) + ",", (err) => {
    //         if (err) throw err;
    //         console.log("save");
    //     });
    //     if (mark.type === "Toetskolom") {
    //         numberOfMarksFound++;
    //         console.log({
    //             "Vak": mark.vak.naam,
    //             "Naam": mark.omschrijving,
    //             "Cijfer": mark.resultaat,
    //         });
    //     }
    // });
    // console.log(numberOfMarksFound);
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