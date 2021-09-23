import fetch, { Response } from "node-fetch";

// TODO: Raw data eruit halen, zoals client_id en baseurls
// TODO: Error handling -> throw errors etc.

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
        })
    .catch(err => { throw err });
}

export const fetchAuthorization = async (schoolUUID: string | undefined, username: string | undefined, password: string | undefined): Promise<void | { accessToken: any; baseURL: any; }> => {

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
            console.log(data);
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

type MarkParameters = {
    normal: boolean,
    average?: boolean,
    year?: number
};

export const getMarks = async (baseURL: string, accessToken: string, userID: number, parameters: MarkParameters): Promise<Array<Object>> => {
    // TODO: Opstellen hoe een grade eruit ziet in de database, dus welke waarden etc.
    
    let responseLength: number = 0;
    let totalMarkList: Array<Object> = [];
    let filteredMarkList: Array<Object> = [];
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
            const markArray: Array<Object> = data?.items;
            totalMarkList = totalMarkList.concat(markArray);
            responseLength = markArray.length;
            rangeParamater++;
        } catch (err) {
            console.log(err);
        }

    } while (responseLength >= 99);

    totalMarkList.forEach((mark: any) => {
        if (mark.leerjaar == parameters.year) {
            if (mark.type == "Toetskolom") {
                if (parameters.normal == true) {
                    filteredMarkList.push({ "mark": mark.geldendResultaat, 
                                            "weighting": mark.weging, 
                                            "exam_weighting": mark.examenWeging, 
                                            "type": mark.type, 
                                            "year": mark.leerjaar, 
                                            "period": mark.periode, 
                                            "description": mark.omschrijving, 
                                            "subject": mark.vak.naam, 
                                            "subject_abbreviation": mark.vak.afkorting, 
                                            "input_date": mark.datumInvoer, 
                                            "is_examendossier_resultaat": mark.isExamendossierResultaat, 
                                            "is_voortgangsdossier_resultaat": mark.isVoortgangsdossierResultaat, 
                                            "origin": "som" });
                }
            } else if (mark.type == "RapportGemiddeldeKolom") {
                if (parameters.average == true) {
                    filteredMarkList.push({ "mark": mark.geldendResultaat, 
                                            "type": mark.type, 
                                            "year": mark.leerjaar, 
                                            "period": mark.periode, 
                                            "subject": mark.vak.naam, 
                                            "subject_abbreviation": mark.vak.afkorting, 
                                            "input_date": mark.datumInvoer, 
                                            "is_examendossier_resultaat": mark.isExamendossierResultaat, 
                                            "is_voortgangsdossier_resultaat": mark.isVoortgangsdossierResultaat, 
                                            "origin": "som" });
                }
            }
        } else {
            if (filteredMarkList.length <= 0) {
                filteredMarkList.push({ "error": "Geen cijfers gevonden voor dit leerjaar" });
            }
        }
    });

    return filteredMarkList;
}