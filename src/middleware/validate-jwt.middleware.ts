import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { IUser } from "../interfaces";
import { User } from "../models";

interface UserPayload {
    uid: string;
}

interface ExtendUserRequest extends Request {
    user?: IUser;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_SEED as string;

export const validateJWT = async (req: ExtendUserRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["Set-Cookie"];
    if (!accessToken) return res.status(401).json({ error: "No hay token en la petición" });

    try {
        const { uid } = jwt.verify(accessToken, JWT_SECRET_KEY) as UserPayload;

        const user = await User.findById(uid);
        if (!user?.state) return res.status(401).json({ error: "Usuario inexistente" });

        req.user = user as IUser;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Token no válido" });
    }
};
