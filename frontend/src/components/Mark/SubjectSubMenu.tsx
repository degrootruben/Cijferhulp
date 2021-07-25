import { Alignment, Button, Collapse, Intent } from "@blueprintjs/core";
import React, { useState, useEffect } from "react";
import { useToggle } from "../../hooks/useToggle";

interface Props {
    marks: Array<any>,
    subject: string,
    deleteNote: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLElement, MouseEvent>) => void,
}

export const SubjectSubMenu: React.FC<Props> = ({ marks, subject, deleteNote }) => {
    const [isOpen, setIsOpen] = useToggle(false);
    const [average, setAverage] = useState<number | null>(0);

    useEffect(() => {
        if (marks) {
            let sum = 0;
            let total = 0;

            marks.map((mark: any) => {
                if (mark.subject === subject) {
                    sum += parseFloat(mark.mark) * parseFloat(mark.weighting);
                    total += mark.weighting;
                }
            });

            setAverage(Math.round((sum / total) * 100) / 100);
        } else {
            setAverage(null);
        }

    }, [marks, subject]);

    return (
        <div className="SubjectSubMenu">
            <Button className="subjectsubmenu-button" alignText={Alignment.LEFT} minimal={true} rightIcon={"caret-down"} onClick={setIsOpen}><h3 className="subject-name">{subject} {average ? (`: ${average}`) : null}</h3></Button>
            <Collapse isOpen={isOpen}>
                <div className="list-off-marks">
                    {marks.map((mark: any) => {
                        if (subject === mark.subject)
                            return <div className="mark">{mark.description} - {mark.mark} * {mark.weighting} <Button id={mark.id} className="deletemark-button" icon="trash" intent={Intent.DANGER} onClick={event => deleteNote(event)} small={true} minimal={true}/> </div>;
                        return;
                    })}
                </div>
            </Collapse>
        </div>
    );
}
