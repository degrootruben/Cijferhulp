declare module Express {
    export interface Request {
        session: any,
        user: any
    }
}