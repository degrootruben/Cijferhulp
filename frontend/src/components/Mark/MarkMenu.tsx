import React from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";

export const MarkButtonGroupMenu = () => {
    return (
        <Menu className="MarkMenu">
            <MenuItem text="Importeren" icon="import">
                <MenuItem text="Vanuit SOMToday" icon="learning" />
                <MenuItem text="Vanuit CSV bestand" icon="list" />
            </MenuItem>
            <MenuItem text="Alles verwijderen" icon="trash" />
            <MenuDivider/>
            <MenuItem text="Vakken" icon="lab-test">
                <MenuItem text="Toevoegen" icon="plus" />
                <MenuItem text="Verwijderen" icon="minus" />
            </MenuItem>
        </Menu>
    )
}
