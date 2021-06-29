import React, { useState, useRef, useEffect } from "react";
import { Button, EditableText, Toaster, Toast, IToastProps, Colors, Navbar, Switch, Alignment } from "@blueprintjs/core";
import { Grid } from "@material-ui/core";

export default function App() {
  const [noteName, setNoteName] = useState("Cijfer 1");
  const [note, setNote] = useState("");
  const [weighting, setWeighting] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  // eslint-disable-next-line
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [navbarStyle, setNavbarStyle] = useState<React.CSSProperties>({});

  const toaster = useRef<Toaster>(null);

  useEffect(() => {
    if (darkMode) {
      setNavbarStyle({ "backgroundColor": Colors.DARK_GRAY4 });
      document.body.style.backgroundColor = Colors.DARK_GRAY1;
    } else {
      setNavbarStyle({ "backgroundColor": Colors.LIGHT_GRAY1 });
      document.body.style.backgroundColor = Colors.WHITE;
    }
  }, [darkMode]);

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

  const addToast = (props: IToastProps) => {
    if (props.timeout) {
      toaster.current?.show(props);
    } else {
      props.timeout = 3000;
      toaster.current?.show(props);
    }
  }

  return (
    <div className={`App ${darkMode ? "bp3-dark" : ""}`}>
      <Navbar className="Navbar" style={navbarStyle} fixedToTop={true}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Cijferhulp</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button className="navbar-button" icon="user" minimal={true}>Profiel</Button>
          <Navbar.Divider/>
          <Switch className="dark-mode-switch" label={`${darkMode ? "🌕" : "🌞"}`} checked={darkMode} onChange={() => setDarkMode(!darkMode)} alignIndicator={Alignment.RIGHT} />
        </Navbar.Group>
      </Navbar>
      <div className="Cijfer">
        <Grid container spacing={2}>
          {/* TODO: Cijfer input en weighting input moeten numerieke input velden worden met increment */}
          {/* TODO: Cijfer input in een form zetten zodat enter ook genoeg is */}
          {/* TODO: Componenten abstracten */}
          <Grid item xs={6}><EditableText className="add-note-textbox" defaultValue="Cijfer 1" placeholder="Naam van toets of proefwerk" value={noteName} onChange={(val) => setNoteName(val)} /></Grid>
          <Grid item xs={3}><EditableText className="add-note-textbox" placeholder="Cijfer" value={note} onChange={(val) => setNote(val)} /></Grid>
          <Grid item xs={3}><EditableText className="add-note-textbox" placeholder="Weging" value={weighting} onChange={(val) => setWeighting(val)} /></Grid>
          <Grid item xs={8}><Button intent="success" text="Toevoegen" onClick={postNote} /></Grid>
          <Grid item xs={4}><Button className="clear-add-note-form-button" intent="danger" text="Verwijderen" onClick={clearForm} /></Grid>
          <Toaster maxToasts={3} canEscapeKeyClear={true} ref={toaster}>{toasts.map(toast => <Toast {...toast} />)}</Toaster>
        </Grid>
      </div>
    </div>
  );
}
