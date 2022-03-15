import { Request, Response, NextFunction } from "express";
import { IUser, IRole } from "../interfaces";

interface ExtendUserRequest extends Request {
    user?: IUser;
}

export const isAdminRole = ({ user }: ExtendUserRequest, res: Response, next: NextFunction) => {
    if (!user) {
        return res.status(500).json({ error: "Se requiere verificar el rol sin válidar el token" });
    }

    try {
        const { name, role } = user;
        if (role !== IRole.Admin) {
            return res.status(401).json({ error: `${name} no es administrador` });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Token no válido" });
    }
};

export const hasValidRole = ([...roles]: string[]) => {
    return ({ user }: ExtendUserRequest, res: Response, next: NextFunction) => {
        if (!user) {
            res.status(500).json({ error: "Se requiere verificar el rol sin válidar el token" });
            return;
        }

        try {
            const { name, role } = user;
            if (!roles.includes(role)) {
                return res.status(401).json({ error: `${name} no es administrador` });
            }

            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({ error: "Token no válido" });
        }
    };
};
