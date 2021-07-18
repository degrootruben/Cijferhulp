import { Pool } from "pg";

interface Mark {
    mark: number,
    weighting: number,
    examWeighting: number,
    type: string,
    year: number,
    period: number,
    description: string,
    subject: string,
    subjectAbbreviation: string,
    inputDate: string,
    isExamendossierResultaat: boolean,
    isVoortgangsdossierResultaat: boolean,
    origin: string,
    userId: string
}

let pool: Pool = new Pool();

if (process.env.NODE_ENV === "production") {
    pool = new Pool({
        ssl: { rejectUnauthorized: false }
    });
}


// TODO: Switch to knex.js
// TODO: Abstract marks database queries from auth database queries

export const insertMarks = async ({ mark, weighting, examWeighting, type, year, period, description, subject, subjectAbbreviation, inputDate, isExamendossierResultaat, isVoortgangsdossierResultaat, origin, userId }: Mark) => {
    // TODO: Support voor meerdere marks in een keer uploaden

    try {
        const response = await pool.query("INSERT INTO marks (mark, weighting, exam_weighting, type, year, period, description, subject, subject_abbreviation, input_date, is_examendossier_resultaat, is_voortgangsdossier_resultaat, origin, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)", [mark, weighting, examWeighting, type, year, period, description, subject, subjectAbbreviation, inputDate, isExamendossierResultaat, isVoortgangsdossierResultaat, origin, userId]);
        return response;
    } catch (error) {
        throw "DB: " + error;
    }
}

export const getMarks = async (userId: string) => {
    try {
        // TODO: Check of er wel een gebruiker is met user_id = user_id

        const response = await pool.query("SELECT * FROM marks WHERE user_id = $1", [userId])
        return response;
    } catch (error) {
        throw "DB: " + error;
    }
}

export const insertUser = async (id: string, email: string, password: string, name: string, createdAt: string) => {
    try {
        if (name == null || name == undefined) {
            name = "";
        }
        const response = await pool.query("INSERT INTO users (id, email, password, name, created_at) VALUES($1, $2, $3, $4, $5)", [id, email, password, name, createdAt]);
        return response;
    } catch (error) {
        throw "DB: " + error;
    }
}

export const getUserPassword = async (email: string): Promise<string> => {
    try {
        const response = await pool.query("SELECT password FROM users WHERE email=$1", [email]);
        if(response.rowCount > 0) {
            const password: string = await response.rows[0].password;
            return password;
        } else {
            throw "Error";
        }
    } catch (error) {
        throw "DB: " + error;
    }
}

export const emailExists = async (email: string): Promise<boolean> => {
    try {
        const response = await pool.query("SELECT email FROM users WHERE email=$1", [email]);
        return response.rowCount > 0;
    } catch (error) {
        throw "DB: " + error;
    }
}

export const getUserId = async (email: string): Promise<string> => {
    try {
        const response = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
        return response.rows[0].id;
    } catch (error) {
        throw "DB: " + error;
    }
}
