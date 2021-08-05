import React, { useState, useEffect } from "react";
import { Divider, IToastProps } from "@blueprintjs/core";
import { PageWrapper } from "../PageWrapper";
import { AddMarkForm } from "./AddMarkForm";
import { MarkList } from "./MarkList";
import { MarkButtonGroup } from "./MarkButtonGroup";
import "../../styling/MarkPage.scss";
import { LoginSOM } from "../Authentication/LoginSOM";
import { useToggle } from "../../hooks/useToggle";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const MarkPage: React.FC<Props> = ({ addToast }) => {
    const [marks, setMarks] = useState<Array<any>>([]);
    const [somLoginIsOpen, setSomeLoginIsOpen] = useToggle(false);
    // TODO: Pagina pas laden als de cijfers ook geladen zijn

    return (
        <div>
            <PageWrapper>
                <MarkButtonGroup setSomLoginIsOpen={setSomeLoginIsOpen} />

                <AddMarkForm setMarks={setMarks} addToast={addToast} />
                <Divider />
                <MarkList marks={marks} setMarks={setMarks} addToast={addToast} />
            </PageWrapper>

            <LoginSOM isOpen={somLoginIsOpen} setIsOpen={setSomeLoginIsOpen}/>
        </div>
    )
}