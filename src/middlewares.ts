import { NextFunction, Request, Response } from "express";

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(403).send({ "error": "You have to be logged in to access this route", "not_logged_in": true });
    } else {
      next();
    }
};