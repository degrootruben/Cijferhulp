import { Pool, QueryResult } from "pg";

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

const pool: Pool = new Pool();

export const insertMarks = async ({mark, weighting, examWeighting, type, year, period, description, subject, subjectAbbreviation, inputDate, isExamendossierResultaat, isVoortgangsdossierResultaat, origin, userId} : Mark) => {
    try {
        const response = await pool.query("INSERT INTO marks (mark, weighting, exam_weighting, type, year, period, description, subject, subject_abbreviation, input_date, is_examendossier_resultaat, is_voortgangsdossier_resultaat, origin, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)", [mark, weighting, examWeighting, type, year, period, description, subject, subjectAbbreviation, inputDate, isExamendossierResultaat, isVoortgangsdossierResultaat, origin, userId]);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getMarks = async (userId: string) => {
    try {
        const response = await pool.query("SELECT * FROM marks WHERE user_id = $1", [ userId ])
        return response;
    } catch (error) {
        throw error;
    }
}


