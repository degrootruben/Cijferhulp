import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Classes, IToastProps } from "@blueprintjs/core";
import * as util from "../../util";
import { SubjectSubMenu } from "./SubjectSubMenu";

interface Props {
    addToast: (toast: IToastProps) => void,
    marks: any[],
    setMarks: React.Dispatch<React.SetStateAction<any[]>>,
}

export const MarkList: React.FC<Props> = ({ addToast, marks, setMarks }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState<Array<string>>([]);

    const deleteNote = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLElement, MouseEvent>) => {
        const id = event.currentTarget.id;

        fetch(util.ENDPOINT + "/mark/" + id, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "user_id": util.getCookie("user_id") })
        }).then(res => res.json())
            .then(data => setMarks(data.marks))
            .catch(error => console.error(error));
        // TODO: Subjects zou weer moeten worden geupdated worden zodat een collpase van
        // een vak ook verdwijnt wanneer er geen cijfers van dat vak meer in die collapse zitten.
    }

    // Effect that loops through marks to find all subjects and puts them into subjects array
    useEffect(() => {
        console.log("marks");

        marks.forEach((mark: any) => {
            if (!subjects.includes(mark.subject)) {
                setSubjects([...subjects, mark.subject]);
            }
        });
    }, [marks, subjects]);

    useEffect(() => {
        setLoading(true);

        const getMarks = async () => {
            const userId = util.getCookie("user_id");

            if (userId !== "") {
                try {
                    const response = await fetch(util.ENDPOINT + "/mark/" + userId, {
                        method: "GET",
                        credentials: "include"
                    });
                    const data = await response.json();

                    if (data.not_logged_in === true) {
                        addToast({ intent: "danger", message: "Je bent niet ingelogd" })
                        history.push("/login");
                    } else {
                        setMarks(data.marks);
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                history.push("/login");
            }
        }

        getMarks();
    }, [addToast, history, setMarks]);

    return (
        <div className={`${loading ? Classes.SKELETON : "MarkList"}`}>
            <h1>Mijn cijfers</h1>
            {subjects.map((subject: string) =>
                <SubjectSubMenu marks={marks} subject={subject} deleteNote={deleteNote} />
            )}
        </div>
    )
}
