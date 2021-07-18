export const getCookie = (cookieName: string): string => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");

    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export const deleteCookie = (cookieName: string) => {
    let maxAge = "max-age=0";
    document.cookie = cookieName + "=null;" + maxAge + ";path=/";
}

export const ENDPOINT = (process.env.NODE_ENV === "production") ? "" : "http://localhost:8000"; 