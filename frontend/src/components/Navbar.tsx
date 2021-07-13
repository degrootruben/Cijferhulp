import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navbar as NavbarBlue, Colors, Alignment, Button, Switch, IToastProps } from "@blueprintjs/core";

interface Props {
    addToast: (toast: IToastProps) => void,
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar: React.FC<Props> = ({ addToast, darkMode, setDarkMode }) => {
    const [navbarStyle, setNavbarStyle] = useState<React.CSSProperties>({});
    const auth = useAuth();
    const history = useHistory();

    const clickLogout = async () => {
        try {
            const response = await auth.logout();
            if (response.success) {
                addToast({ "intent": "success", "message": "Je bent nu uitgelogd" });
                history.push("/login");
            } else if (response.error) {
                addToast({ "intent": "danger", "message": "Er ging iets mis tijdens het uitloggen" });
            }
        } catch (error) {
            if (error.not_logged_in === true) {
                return;
            }
        }
    }

    useEffect(() => {
        if (darkMode) {
            setNavbarStyle({ "backgroundColor": Colors.DARK_GRAY4 });
            document.body.style.backgroundColor = Colors.DARK_GRAY1;
        } else {
            setNavbarStyle({ "backgroundColor": Colors.LIGHT_GRAY1 });
            document.body.style.backgroundColor = Colors.WHITE;
        }
    }, [darkMode]);

    return (
        <div className="Navbar">
            <NavbarBlue style={navbarStyle} fixedToTop={false}>
                <NavbarBlue.Group align={Alignment.LEFT}>
                    <NavbarBlue.Heading>Cijferhulp</NavbarBlue.Heading>
                </NavbarBlue.Group>
                <NavbarBlue.Group align={Alignment.RIGHT}>
                    <Button className="navbar-button" icon="user" minimal={true}>Profiel</Button>
                    <NavbarBlue.Divider />
                    <Switch className="dark-mode-switch" label={`${darkMode ? "🌕" : "🌞"}`} checked={darkMode} onChange={() => setDarkMode(!darkMode)} alignIndicator={Alignment.RIGHT} />
                    <Button className="navbar-button" icon="log-out" minimal={true} onClick={clickLogout} />
                </NavbarBlue.Group>
            </NavbarBlue>
        </div>
    )
}
