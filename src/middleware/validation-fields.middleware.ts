import { validationResult } from "express-validator";
import { TypeMiddleware } from "./contants";

export const validationField: TypeMiddleware = (req, res, next) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            const msg = error.array().map(({ msg, param }) => ({ msg, param }));
            return res.status(400).json({ errors: msg });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Hable con el administrador" });
    }
};
