import React, { useState, useRef } from "react";
import { Toaster, Toast, IToastProps } from "@blueprintjs/core";
import { AddMarkForm } from "./components/AddMarkForm";
import { Navbar } from "./components/Navbar";

// TODO: Web app / manifest aanpassen

export const App: React.FC<{}> = () => {
  const [darkMode, setDarkMode] = useState(true);
  // eslint-disable-next-line

  const toasts: Toast[] = [];
  const toaster = useRef<Toaster>(null);

  const cookieExists = (cookieName: string): boolean => {
    if (typeof (cookieName) == "string" && cookieName !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].trim().startsWith(cookieName)) {
          return true;
        }
      }
    }
    return false;
  }

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
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <AddMarkForm addToast={addToast}/>
      <Toaster maxToasts={3} canEscapeKeyClear={true} ref={toaster}>{toasts.map(toast => <Toast {...toast} />)}</Toaster>
    </div>
  );
}
