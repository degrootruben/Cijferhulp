import fetch, { Response } from "node-fetch";

const getSchoolUUID = (schoolName: string | undefined) => {
    return fetch("https://servers.somtoday.nl/organisaties.json", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
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

export const getAccesToken = async (schoolName: string | undefined, username: string | undefined, password: string | undefined) => {
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
        return data.access_token
    })
    .catch(err => console.log(err));
}