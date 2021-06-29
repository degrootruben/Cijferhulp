import React from "react";
import { Switch } from "@blueprintjs/core";

interface Props {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    style: React.CSSProperties
};

const Navbar: React.FC<Props> = ({ darkMode, setDarkMode, style }) => {
    return (
        <div className="Navbar" style={style}>
            <Switch className="Switch" label="Dark mode" checked={darkMode} onChange={() => setDarkMode(!darkMode)}></Switch>
        </div>
    )
};

export default Navbar;
