import React, { useState, useEffect } from "react";
import { Divider, IToastProps } from "@blueprintjs/core";
import { PageWrapper } from "../PageWrapper";
import { AddMarkForm } from "./AddMarkForm";
import { MarkList } from "./MarkList";
import { MarkButtonGroup } from "./MarkButtonGroup";
import "../../styling/MarkPage.scss";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const MarkPage: React.FC<Props> = ({ addToast }) => {
    const [marks, setMarks] = useState<Array<any>>([]);
    // TODO: Pagina pas laden als de cijfers ook geladen zijn
    
    return (
        <PageWrapper>
            <MarkButtonGroup />

            <AddMarkForm setMarks={setMarks} addToast={addToast} />
            <Divider />
            <MarkList marks={marks} setMarks={setMarks} addToast={addToast} />
        </PageWrapper>
    )
}