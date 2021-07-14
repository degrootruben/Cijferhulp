import React, { FormEvent, useState } from "react";
import { Grid } from "@material-ui/core";
import { InputGroup, ControlGroup, Button, Intent, IToastProps, NumericInput } from "@blueprintjs/core";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const AddMarkForm: React.FC<Props> = ({ addToast }) => {
    const [noteName, setMarkName] = useState("Cijfer 1");
    const [note, setMark] = useState(0);
    const [weighting, setWeighting] = useState(0);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const postNote = () => {
        if (noteName === "" || noteName === " " || noteName === undefined || noteName === null ||
            note === undefined || note === null ||
            weighting === undefined || weighting === null) {
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
        setMarkName("");
        setMark(0);
        setWeighting(0);
    };

    return (
        <div className="AddMarkForm">
            <Grid container spacing={2}>
                {/* TODO: Cijfer input in een form zetten zodat enter ook genoeg is */}
                <Grid item xs={6}>
                    <InputGroup
                        className="add-mark-inputfield"
                        placeholder="Naam van toets of proefwerk"
                        value={noteName}
                        onChange={(e) => setMarkName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <NumericInput
                        className="add-mark-inputfield"
                        placeholder="Cijfer"
                        value={note}
                        onValueChange={(val) => setMark(val)}
                        max={10}
                        min={0}
                        majorStepSize={1}
                        minorStepSize={0.01}
                        stepSize={0.1}
                    />
                </Grid>
                <Grid item xs={3}>
                    <NumericInput
                        className="add-mark-inputfield"
                        placeholder="Weging"
                        value={weighting}
                        onValueChange={(val) => setWeighting(val)}
                        max={1000}
                        min={0}
                        majorStepSize={10}
                        minorStepSize={0.1}
                        stepSize={1}
                    />
                </Grid>
                <Grid item xs={6}><Button intent={Intent.PRIMARY} type="submit" text="Toevoegen" minimal={true} /></Grid>
                <Grid item xs={6}><Button className="clear-mark-form-button" intent={Intent.DANGER} text="Reset" onClick={clearForm} minimal={true} /></Grid>
            </Grid>
        </div>
    )
}
