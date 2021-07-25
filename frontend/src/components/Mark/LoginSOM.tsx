import React from "react";
import { Dialog, Classes } from "@blueprintjs/core";
import { DarkmodeContext } from "../../context/darkmode-context";

interface Props {
    isOpen: boolean,
}

export const LoginSOM: React.FC<Props> = ({ isOpen }) => {
    return (
        <DarkmodeContext.Consumer>
            {darkMode => (
                <Dialog className={`LoginSOM ${darkMode ? "bp3-dark" : ""}`} title="Inloggen met SOM" isOpen={isOpen}>
                    <h3 className={Classes.DIALOG_BODY}>Inloggen met SOM</h3>
                </Dialog>
            )}
        </DarkmodeContext.Consumer>
    )
}
