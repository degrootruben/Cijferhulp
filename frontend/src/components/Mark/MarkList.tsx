import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IToastProps } from "@blueprintjs/core";
import * as util from "../../util";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const MarkList: React.FC<Props> = ({ addToast }) => {
    const [marks, setMarks] = useState([{}]);
    const history = useHistory();

    useEffect(() => {
        const getMarks = async () => {
            const userId = util.getCookie("user_id");

            if (userId !== "") {
                try {
                    const response = await fetch("http://localhost:8000/api/mark/" + userId, {
                        method: "GET",
                        credentials: "include"
                    });
                    const data = await response.json();

                    if (data.not_logged_in === true) {
                        addToast({ intent: "danger", message: "Je bent niet ingelogd." })
                        history.push("/login");
                    } else {
                        console.log(data.marks);
                        setMarks(data.marks);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                history.push("/login");
            }
        }

        getMarks();
    }, [addToast, history]);

    return (
        <div>
            {marks.map((mark: any) => <p>{mark.description} {mark.mark} </p>)}
        </div>
    )
}
