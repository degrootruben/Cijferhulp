import React, { useState, useEffect } from "react";
import { Divider, IToastProps, Card, Elevation } from "@blueprintjs/core";
import { AddMarkForm } from "./AddMarkForm";
import { MarkList } from "./MarkList";
import { MarkButtonGroup } from "./MarkButtonGroup";
import "../../styling/MarkPage.scss";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const MarkPage: React.FC<Props> = ({ addToast }) => {
    const [marks, setMarks] = useState<Array<any>>([]);

    return (
        <Card className="Marks" interactive={false} elevation={Elevation.ZERO}>
            <MarkButtonGroup />

            <AddMarkForm setMarks={setMarks} addToast={addToast} />
            <Divider />
            <MarkList marks={marks} setMarks={setMarks} addToast={addToast} />
        </Card>
    )
}