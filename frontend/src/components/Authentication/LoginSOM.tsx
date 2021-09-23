import React, { useState, useEffect, useRef, FormEvent, ChangeEventHandler } from "react";
import { Dialog, Classes, InputGroup, Intent, Button, HTMLSelect, IRef } from "@blueprintjs/core";
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
    const [uuid, setSchoolUUID] = useState("6901e895-b818-449d-910e-8dca0183cc3a");

    const firstMount = useRef(true);

    useEffect(() => {
        (async () => {
            if (firstMount.current) {
                firstMount.current = false;
                return;
            }

            const response = await fetch(ENDPOINT + "/api/somtoday/schools", { credentials: "include" });
            const data = await response.json();

            if (data.success) {
                toggleSchoolsLoaded();
                setSchools(data.schools);
            }

        })();
    }, [isOpen]);

    const loginToSom = async (e: FormEvent) => {
        e.preventDefault();

        console.log("Trying to login to som");

        try {
            console.log(uuid);
            // const response = await fetch(ENDPOINT + "/api/somtoday/login", {
            //     method: "POST",
            //     credentials: "include",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({ uuid, username, password })
            // });
            // const data = await response.json();

        } catch (err) {
            console.error(err);
        }

    }

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
                    <form onSubmit={loginToSom}>
                        <div className={`${Classes.DIALOG_BODY} loginSOM-form ${schoolsLoaded ? "" : Classes.SKELETON}`}>
                            <HTMLSelect id="selector" onChange={(e) => setSchoolUUID(e.currentTarget.value)} className="school-selector" defaultValue="6901e895-b818-449d-910e-8dca0183cc3a" minimal={true} fill={true}>
                                {schools.map((school: School) => (
                                    <option value={school.uuid}>{school.naam}</option>
                                ))}
                            </HTMLSelect>
                            <InputGroup className="username-inputfield" placeholder="Gebruikersnaam" value={username} onChange={e => setUsername(e.target.value)} required />
                            <InputGroup className="password-inputfield" placeholder="Wachtwoord" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} rightElement={<LockButton />} required />
                        </div>
                        <div className={Classes.DIALOG_FOOTER}>
                            <Button type="submit" intent={Intent.PRIMARY} minimal={true}>Inloggen</Button>
                        </div>
                    </form>

                </Dialog>
            )
            }
        </DarkmodeContext.Consumer >
    )
}
