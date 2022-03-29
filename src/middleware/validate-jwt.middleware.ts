import jwt from "jsonwebtoken";

import { User } from "../models";
import { TypeValidedMiddleware, TypePayloadUser } from "./contants";

const SECRET_KEY = process.env.JWT_SECRET_SEED as string;

export const validateJWT: TypeValidedMiddleware = async (req, res, next) => {
    const accessToken = req.cookies["Set-Cookie"] as string;
    if (!accessToken) return res.status(401).json({ error: "No hay token en la petición" });

    try {
        const { uid } = jwt.verify(accessToken, SECRET_KEY) as TypePayloadUser;

        const user = await User.findById(uid);
        if (!user?.state) return res.status(401).json({ error: "Usuario inexistente" });

        req.user = user;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Token no válido" });
    }
};
