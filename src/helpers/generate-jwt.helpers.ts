import jwt from "jsonwebtoken";

import { TypeGenerateJWT } from "./contants";

const SECRET_TOKEN = process.env.JWT_SECRET_SEED as string;

export const generateJWT: TypeGenerateJWT = (payload) => {
    return new Promise((res, rej) => {
        // TOKEN expires in 4 hours
        jwt.sign(payload, SECRET_TOKEN, { expiresIn: "4h" }, (err, token) => {
            if (err) rej(err.message);

            res(token);
        });
    });
};
