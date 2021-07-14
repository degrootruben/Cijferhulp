import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Divider, IToastProps, Card, Elevation, ButtonGroup, Button, Intent } from "@blueprintjs/core";
import { AddMarkForm } from "./AddMarkForm";
import { MarkList } from "./MarkList";
import { MarkButtonGroup } from "./MarkButtonGroup";
import "../../styling/MarkPage.scss";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const MarkPage: React.FC<Props> = ({ addToast }) => {

    return (
        <Card className="Marks" interactive={false} elevation={Elevation.ZERO}>
            <MarkButtonGroup />

            <AddMarkForm addToast={addToast} />
            <Divider />
            <MarkList addToast={addToast} />
        </Card>
    )
}