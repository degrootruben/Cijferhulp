import fetch, { Response } from "node-fetch";

const getSchoolUUID = (schoolName: string | undefined) => {
    return fetch("https://servers.somtoday.nl/organisaties.json", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            for (var i = 0; i < data[0].instellingen.length; i++) {
                const school = data[0].instellingen[i];

                if (school.naam == schoolName) {
                    return school.uuid;
                    break;
                }
            }
        });
}

export const fetchAuthorization = async (schoolName: string | undefined, username: string | undefined, password: string | undefined): Promise<void | { accessToken: any; baseURL: any; }> => {
    const schoolUUID = await getSchoolUUID(schoolName);

    const body: any = {
        "grant_type": "password",
        "username": schoolUUID + "\\" + username,
        "password": password,
        "scope": "openid",
        "client_id": "D50E0C06-32D1-4B41-A137-A9A850C892C2"
    };

    var formBody: any = [];
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch("https://somtoday.nl/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        body: formBody
    }).then(res => res.json())
        .then(data => {
            return { accessToken: data.access_token, baseURL: data.somtoday_api_url };
        })
        .catch(err => console.log(err));
}

export const getUserID = (baseURL: string, accessToken: string): Promise<number> => {
    return fetch(baseURL + "/rest/v1/leerlingen", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    }).then(res => res.json())
        .then(data => {
            if (data.items[0].links[0].rel === "self") {
                return data.items[0].links[0].id;
            } else {
                console.log("Error while fetching userid, relation to user is not self");
            }
        })
        .catch(err => console.log(err));
}

export const getGrades = async (baseURL: string, accessToken: string, userID: number): Promise<Array<Object>> => {
    let responseLength: number = 0;
    let totalGradeList: Array<Object> = [];
    let rangeParamater: number = 0;

    do {
        try {
            const res = await fetch(baseURL + "/rest/v1/resultaten/huidigVoorLeerling/" + userID, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + accessToken,
                    "Range": `items=${rangeParamater}00-${rangeParamater}99`,
                }
            });
            const data: any = await res.json();
            const gradeArray: Array<Object> = data?.items;
            totalGradeList = totalGradeList.concat(gradeArray);
            responseLength = gradeArray.length;
            rangeParamater++;
        } catch (err) {
            console.log(err);
        }

    } while (responseLength >= 99);

    return totalGradeList;
}