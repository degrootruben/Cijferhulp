import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/provide-auth";

export const MarkList = () => {
    const auth = useAuth();
    const [marks, setMarks] = useState([{}]);

    useEffect(() => {
        const getMarks = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/mark/" + auth.user, {
                    method: "GET",
                    credentials: "include"
                });
                const data = await response.json();
                console.log(data.marks);
                setMarks(data.marks);
            } catch (error) {
                console.log(error);
            }
        }

        getMarks();
    }, []);

    return (
        <div>
            {marks.map((mark: any) => <p>{mark.description} {mark.mark} </p>)}
        </div>
    )
}
