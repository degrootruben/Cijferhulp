import { Button, Collapse } from "@blueprintjs/core";
import React, { useState, useEffect } from "react";
import { useToggle } from "../../hooks/useToggle";

interface Props {
    marks: Array<any>,
    subject: string
}

export const SubjectSubMenu: React.FC<Props> = ({ marks, subject }) => {
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
            <Button minimal={true} rightIcon={"caret-down"} onClick={setIsOpen}><h3 className="subject-name">{subject} {average ? (`: ${average}`) : null}</h3></Button>
            <Collapse isOpen={isOpen}>
                <div className="list-off-marks">
                    {marks.map((mark: any) => {
                        if (subject === mark.subject)
                            return <p>{mark.description} - {mark.mark} * {mark.weighting}</p>;
                        return "";
                    }
                    )}
                </div>
            </Collapse>
        </div>
    );
}
