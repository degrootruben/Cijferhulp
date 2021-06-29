import React, { useState, useRef } from 'react';
import { Button, EditableText, Toaster, Toast, IToastProps } from "@blueprintjs/core";
import { Grid } from "@material-ui/core";

function App() {
  const [noteName, setNoteName] = useState("");
  const [note, setNote] = useState("");
  const [weighting, setWeighting] = useState("");
  // eslint-disable-next-line
  const [toasts, setToasts] = useState([]);

  const toaster = useRef<Toaster>(null);

  const postNote = () => {
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
          if(data.status === "success") {
            addNote();
          }
        })
        .catch(error => console.log(error));
    } else {
      addToast({ timeout: 5000, intent: "danger", message: "Cijfer en weging moeten beide een nummer zijn!"});
    }
  }

  const addNote = () => {
    // TODO: In de response van de request zit een lijst met alle cijfes inclusief gemiddelden
    // deze moet op het scherm worden gezet
    addToast({ timeout: 5000, intent: "success", message: "Cijfer toegevoegd!" });
  };

  const addToast = (props: IToastProps) => {
    toaster.current?.show(props);
  }

  return (
    <div className="App">
      <div className="cijfer">
        <Grid container spacing={2}>
          <Grid item xs={4}><EditableText defaultValue="Cijfer 1" placeholder="Naam van toets of proefwerk" value={noteName} onChange={(val) => setNoteName(val)} /></Grid>
          <Grid item xs={4}><EditableText placeholder="Cijfer" value={note} onChange={(val) => setNote(val)} /></Grid>
          <Grid item xs={4}><EditableText placeholder="Weging" value={weighting} onChange={(val) => setWeighting(val)} /></Grid>
          <Grid item xs={8}><Button intent="success" text="Toevoegen" onClick={postNote} /></Grid>
          <Grid item xs={4}><Button intent="danger" text="Verwijderen" /></Grid>
          <Toaster maxToasts={3} canEscapeKeyClear={true} ref={toaster}>{toasts.map(toast => <Toast {...toast} />)}</Toaster>
        </Grid>
      </div>
    </div>
  );
}

export default App;
