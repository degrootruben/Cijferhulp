import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { InputGroup, Button, Intent, IToastProps, NumericInput } from "@blueprintjs/core";
import * as util from "../../util";

interface Props {
    addToast: (toast: IToastProps) => void,
    setMarks: React.Dispatch<React.SetStateAction<any[]>>
}

export const AddMarkForm: React.FC<Props> = ({ addToast, setMarks }) => {
    const [mark, setMark] = useState(0);
    const [weighting, setWeighting] = useState(0);
    const [markDescription, setMarkDescription] = useState("Cijfer 1");
    const [subject, setSubject] = useState("");

    const postNote = () => {
        // TODO: Nog meer field toevoegen als input field, deze ook meegeven in de body van de fetch

        if (markDescription === "" || markDescription === " " || markDescription === undefined || markDescription === null ||
            mark === undefined || mark === null ||
            weighting === undefined || weighting === null) {
            addToast({ intent: "danger", message: "Vul tenminste de omschrijving, het cijfer en de weging in!" })
        } else {
            if (!isNaN(Number(mark)) && !isNaN(Number(weighting))) {

                fetch(util.ENDPOINT + "/api/mark", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ mark, weighting, description: markDescription, subject, origin: "manual", user_id: util.getCookie("user_id") })
                }).then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            addMark(data.marks);
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                addToast({ intent: "danger", message: "Cijfer en weging moeten beide een nummer zijn!" });
            }
        }
    }

    const addMark = (responseMarks: any) => {
        setMarks(responseMarks);
        addToast({ intent: "success", message: "Cijfer toegevoegd!" });
    };

    const clearForm = () => {
        setMarkDescription("");
        setMark(0);
        setWeighting(0);
    };

    return (
        <div className="AddMarkForm">
            <Grid container spacing={2}>
                {/* TODO: Cijfer input in een form zetten zodat enter ook genoeg is */}
                <Grid item xs={3}>
                    <InputGroup
                        className="addmark-inputfield"
                        placeholder="Vak"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <InputGroup
                        className="addmark-inputfield"
                        placeholder="Naam van toets of proefwerk"
                        value={markDescription}
                        onChange={(event) => setMarkDescription(event.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <NumericInput
                        className="addmark-inputfield"
                        placeholder="Cijfer"
                        value={mark}
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
                        className="addmark-inputfield"
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

                <Grid item xs={6}><Button intent={Intent.PRIMARY} text="Toevoegen" minimal={true} onClick={postNote} /></Grid>
                <Grid item xs={6}><Button className="clear-markform-button" intent={Intent.DANGER} text="Reset" onClick={clearForm} minimal={true} /></Grid>
            </Grid>
        </div>
    )
}
