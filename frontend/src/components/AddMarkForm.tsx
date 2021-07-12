import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { EditableText, Button, IToastProps } from "@blueprintjs/core";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const AddMarkForm: React.FC<Props> = ({ addToast }) => {
    const [noteName, setNoteName] = useState("Cijfer 1");
    const [note, setNote] = useState("");
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
        setNoteName("Cijfer 1");
        setNote("");
        setWeighting("");
    };

    return (
        <div className="AddMarkForm">
            <Grid container spacing={2}>
                {/* TODO: Cijfer input en weighting input moeten numerieke input velden worden met increment */}
                {/* TODO: Cijfer input in een form zetten zodat enter ook genoeg is */}
                <Grid item xs={6}><EditableText className="add-note-textbox" defaultValue="Cijfer 1" placeholder="Naam van toets of proefwerk" value={noteName} onChange={(val) => setNoteName(val)} /></Grid>
                <Grid item xs={3}><EditableText className="add-note-textbox" placeholder="Cijfer" value={note} onChange={(val) => setNote(val)} /></Grid>
                <Grid item xs={3}><EditableText className="add-note-textbox" placeholder="Weging" value={weighting} onChange={(val) => setWeighting(val)} /></Grid>
                <Grid item xs={8}><Button intent="success" text="Toevoegen" onClick={postNote} /></Grid>
                <Grid item xs={4}><Button className="clear-add-note-form-button" intent="danger" text="Verwijderen" onClick={clearForm} /></Grid>
            </Grid>
        </div>
    )
}