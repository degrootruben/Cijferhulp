import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { EditableText, Button, Intent, IToastProps } from "@blueprintjs/core";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const AddMarkForm: React.FC<Props> = ({ addToast }) => {
    const [noteName, setMarkName] = useState("Cijfer 1");
    const [note, SetMark] = useState("");
    const [weighting, setWeighting] = useState("");

    const postNote = () => {
        if (noteName === "" || noteName === " " || noteName === undefined || noteName === null ||
            note === "" || note === " " || note === undefined || note === null ||
            weighting === "" || weighting === " " || weighting === undefined || weighting === null) {
            addToast({ intent: "danger", message: "Vul alle gegevens in!" })
        } else {
            if (!isNaN(Number(note)) && !isNaN(Number(weighting))) {
                console.log("Posting note...");

                fetch("http://localhost:8000/api/note", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ noteName, note, weighting })
                }).then(res => res.json())
                    .then(data => {
                        if (data.status === "success") {
                            addNote();
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                addToast({ intent: "danger", message: "Cijfer en weging moeten beide een nummer zijn!" });
            }
        }
    }

    const addNote = () => {
        // TODO: In de response van de request zit een lijst met alle cijfes inclusief gemiddelden
        // deze moet op het scherm worden gezet
        addToast({ intent: "success", message: "Cijfer toegevoegd!" });
    };

    const clearForm = () => {
        setMarkName("Cijfer 1");
        SetMark("");
        setWeighting("");
    };

    return (
        <div>
            <Grid container spacing={2}>
                {/* TODO: Cijfer input en weighting input moeten numerieke input velden worden met increment */}
                {/* TODO: Cijfer input in een form zetten zodat enter ook genoeg is */}
                <Grid item xs={6}><EditableText className="add-mark-textbox" defaultValue="Cijfer 1" placeholder="Naam van toets of proefwerk" value={noteName} onChange={(val) => setMarkName(val)} /></Grid>
                <Grid item xs={3}><EditableText className="add-mark-textbox" placeholder="Cijfer" value={note} onChange={(val) => SetMark(val)} /></Grid>
                <Grid item xs={3}><EditableText className="add-mark-textbox" placeholder="Weging" value={weighting} onChange={(val) => setWeighting(val)} /></Grid>
                <Grid item xs={6}><Button intent={Intent.PRIMARY} text="Toevoegen" onClick={postNote} minimal={true} /></Grid>
                <Grid item xs={6}><Button className="clear-add-mark-form-button" intent={Intent.DANGER} text="Verwijderen" onClick={clearForm} minimal={true} /></Grid>
            </Grid>
        </div>
    )
}
