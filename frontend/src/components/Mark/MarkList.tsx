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

    // Effect that loops through marks to find all subjects and puts them into subjects array
    useEffect(() => {
        marks.map((mark: any) => {
            if (!subjects.includes(mark.subject)) {
                subjects.push(mark.subject);
                setSubjects(subjects);
            }
        });
    }, [marks]);

    useEffect(() => {
        setLoading(true);

        const getMarks = async () => {
            const userId = util.getCookie("user_id");

            if (userId !== "") {
                try {
                    const response = await fetch(util.ENDPOINT + "/api/mark/" + userId, {
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
                <SubjectSubMenu marks={marks} subject={subject} />
            )}
        </div>
    )
}
