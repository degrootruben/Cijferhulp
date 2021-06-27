import React, { useState } from 'react';
import { Button, EditableText } from "@blueprintjs/core";
import { Grid } from "@material-ui/core";

function App() {
  const [noteName, setNoteName] = useState("");
  const [note, setNote] = useState("");
  const [weighting, setWeighting] = useState("");

  const addNote = () => {
    if (!isNaN(Number(note)) && !isNaN(Number(weighting))) {
      console.log("Posting note...");

      fetch("http://localhost:8000/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ noteName, note, weighting })
      }).then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    } else {
      alert("Cijfer en weging moeten beide een nummer zijn!");
    }
  }

  return (
    <div className="App">
      <div className="cijfer">
        <Grid container spacing={2}>
          <Grid item xs={4}><EditableText defaultValue="Cijfer 1" placeholder="Naam van toets of proefwerk" value={noteName} onChange={(val) => setNoteName(val)} /></Grid>
          <Grid item xs={4}><EditableText placeholder="Cijfer" value={note} onChange={(val) => setNote(val)} /></Grid>
          <Grid item xs={4}><EditableText placeholder="Weging" value={weighting} onChange={(val) => setWeighting(val)} /></Grid>
          <Grid item xs={8}><Button intent="success" text="Toevoegen" onClick={addNote} /></Grid>
          <Grid item xs={4}><Button intent="danger" text="Verwijderen" /></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
