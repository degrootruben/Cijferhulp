import React, { useState, useEffect, useRef } from "react";
import { Dialog, Classes, InputGroup, Intent, Button, HTMLSelect } from "@blueprintjs/core";
import { DarkmodeContext } from "../../context/darkmode-context";
import { ReactComponent as SomTodayLogo } from "../../img/somtoday-logo.svg";
import { useToggle } from "../../hooks/useToggle";
import { ENDPOINT } from "../../util";
import "../../styling/LoginSOM.scss";

interface Props {
    isOpen: boolean,
    setIsOpen: any
}

interface School {
    naam: string,
    uuid: string
}

export const LoginSOM: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, toggleShowPassword] = useToggle(false);
    const [schoolsLoaded, toggleSchoolsLoaded] = useToggle(false);
    const [schools, setSchools] = useState([]);

    const firstMount = useRef(true);

    useEffect(() => {
        (async () => {
            if (firstMount.current) {
                firstMount.current = false;
                return;
            }

            const response = await fetch(ENDPOINT + "/api/somtoday/schools");
            const data = await response.json();

            if (data.success) {
                toggleSchoolsLoaded();
                setSchools(data.schools);
            }

        })();
    }, [isOpen]);

    const SomTodayLogoResized = () => {
        return (
            <div className="SomTodayLogo">
                <SomTodayLogo />
            </div>
        )
    }

    const LockButton = () => {
        return (
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={toggleShowPassword}
            />
        )
    }

    return (
        <DarkmodeContext.Consumer>
            {darkMode => (
                <Dialog className={`LoginSOM ${darkMode ? "bp3-dark" : ""}`} title="Inloggen met SOMToday" isOpen={isOpen} autoFocus={true} canOutsideClickClose={true} onClose={setIsOpen} icon={<SomTodayLogoResized />}>
                    <div className={`${Classes.DIALOG_BODY} ${schoolsLoaded ? "" : Classes.SKELETON}`}>
                        <form className="loginSOM-form">
                            <HTMLSelect className="school-selector" minimal={true} fill={true}>
                                {schools.map((school: School) => (
                                    <option key={school.uuid}>{school.naam}</option>
                                ))}
                            </HTMLSelect>
                            <InputGroup className="username-inputfield" placeholder="Gebruikersnaam" value={username} onChange={e => setUsername(e.target.value)} required />
                            <InputGroup className="password-inputfield" placeholder="Wachtwoord" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} rightElement={<LockButton />} required />
                        </form>
                    </div>

                    <div className={Classes.DIALOG_FOOTER}>

                    </div>
                </Dialog>
            )}
        </DarkmodeContext.Consumer>
    )
}
