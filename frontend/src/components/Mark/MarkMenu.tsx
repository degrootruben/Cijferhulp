import React, { useState } from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { LoginSOM } from "./LoginSOM";
import { useEffect } from "react";

export const MarkButtonGroupMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const importFromSOM = () => {
        setIsOpen(true);
    }

    return (
        <div className="MarkMenu">
            <Menu>
                <MenuItem text="Importeren" icon="import">
                    <MenuItem text="Vanuit SOMToday" icon="learning" onClick={importFromSOM} />
                    <MenuItem text="Vanuit CSV bestand" icon="list" />
                </MenuItem>
                <MenuItem text="Alles verwijderen" icon="trash" />
                <MenuDivider />
                <MenuItem text="Vakken" icon="lab-test">
                    <MenuItem text="Toevoegen" icon="plus" />
                    <MenuItem text="Verwijderen" icon="minus" />
                </MenuItem>
            </Menu>
            <LoginSOM isOpen={isOpen} />
        </div>
    )
}
