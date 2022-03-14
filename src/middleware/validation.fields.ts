import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validationField = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const msg = error.array().map(({ msg, param }) => ({ msg, param }));
        return res.status(400).json({ errors: msg });
    }

    next();
};
