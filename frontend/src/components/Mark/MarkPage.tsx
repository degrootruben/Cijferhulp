import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { IToastProps } from "@blueprintjs/core";
import { AddMarkForm } from "./AddMarkForm";
import { MarkList } from "./MarkList";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const MarkPage: React.FC<Props> = ({ addToast }) => {


    return (
        <div className="Marks">
            <AddMarkForm addToast={addToast}/>
            <h1>Marks</h1>
            <MarkList addToast={addToast}/>
        </div>
    )
}