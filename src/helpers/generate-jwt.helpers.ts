import jwt from "jsonwebtoken";

type GenerateJWT = ({ uid }: { uid: string }) => Promise<string | undefined> | never;

export const generateJWT: GenerateJWT = (uid) => {
    return new Promise((res, rej) => {
        // TOKEN expires in 4h
        jwt.sign(uid, process.env.JWT_SECRET_SEED as string, { expiresIn: "4h" }, (err, token) => {
            if (err) rej(err.message);

            res(token);
        });
    });
};
