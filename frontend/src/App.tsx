import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import { Toaster, Toast, IToastProps } from "@blueprintjs/core";
import { MarkPage } from "./components/Mark/MarkPage";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";

// TODO: Web app / manifest aanpassen

export const App: React.FC<{}> = () => {
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
          <Navbar addToast={addToast} darkMode={darkMode} setDarkMode={setDarkMode} />

          <Switch>
            <Route exact path="/"><MarkPage addToast={addToast} /></Route>
            <Route exact path="/login"><Login addToast={addToast} /></Route>
          </Switch>

          <Toaster maxToasts={3} canEscapeKeyClear={true} ref={toaster}>{toasts.map(toast => <Toast {...toast} />)}</Toaster>
        </div>
      </ProvideAuth>
    </Router>
  );
}
