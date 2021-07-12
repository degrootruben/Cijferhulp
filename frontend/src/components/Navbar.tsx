import React, { useEffect, useState } from 'react'
import { Navbar as NavbarBlue, Colors, Alignment, Button, Switch } from "@blueprintjs/core";

interface Props {
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar: React.FC<Props> = ({ darkMode, setDarkMode }) => {
    const [navbarStyle, setNavbarStyle] = useState<React.CSSProperties>({});

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
            <NavbarBlue style={navbarStyle} fixedToTop={true}>
                <NavbarBlue.Group align={Alignment.LEFT}>
                    <NavbarBlue.Heading>Cijferhulp</NavbarBlue.Heading>
                </NavbarBlue.Group>
                <NavbarBlue.Group align={Alignment.RIGHT}>
                    <Button className="navbar-button" icon="user" minimal={true}>Profiel</Button>
                    <NavbarBlue.Divider />
                    <Switch className="dark-mode-switch" label={`${darkMode ? "🌕" : "🌞"}`} checked={darkMode} onChange={() => setDarkMode(!darkMode)} alignIndicator={Alignment.RIGHT} />
                </NavbarBlue.Group>
            </NavbarBlue>
        </div>
    )
}
