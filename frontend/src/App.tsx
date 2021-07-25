import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import { Toaster, Toast, IToastProps } from "@blueprintjs/core";
import { MarkPage } from "./components/Mark/MarkPage";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Authentication/Login";
import { Register } from "./components/Authentication/Register";
import { DarkmodeContext } from "./context/darkmode-context";


// TODO: Web app / manifest aanpassen

export const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  // eslint-disable-next-line

  const toasts: Toast[] = [];
  const toaster = useRef<Toaster>(null);

  const addToast = (props: IToastProps) => {
    if (props.timeout) {
      toaster.current?.show(props);
    } else {
      props.timeout = 3000;
      toaster.current?.show(props);
    }
  }

  return (
    <Router>
      <ProvideAuth>
        <div className={`App ${darkMode ? "bp3-dark" : ""}`}>
          <DarkmodeContext.Provider value={darkMode}>
            <Navbar addToast={addToast} darkMode={darkMode} setDarkMode={setDarkMode} />

            <Switch>
              <Route exact path="/"><MarkPage addToast={addToast} /></Route>
              <Route exact path="/login"><Login addToast={addToast} /></Route>
              <Route exact path="/register"><Register addToast={addToast} /></Route>
            </Switch>

          </DarkmodeContext.Provider>
        </div>
      </ProvideAuth>

      <Toaster maxToasts={3} canEscapeKeyClear={true} ref={toaster}>{toasts.map(toast => <Toast {...toast} />)}</Toaster>
    </Router>
  );
}
