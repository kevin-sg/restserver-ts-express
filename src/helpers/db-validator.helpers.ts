import { Request } from "express";
import { CustomValidator } from "express-validator";
import bycript from "bcryptjs";

import { User, Role } from "../models";

type ValidedFiels = (key: string, { req }: { req: Request }) => Promise<boolean> | never;
type ValidMiddlewareFN = CustomValidator & ValidedFiels;

export const isValidRole: ValidMiddlewareFN = async (role = "") => {
    const isValueRole = await Role.findOne({ role });
    if (!isValueRole) {
        throw new Error(`Rol ${role} no está registrado en la BD`);
    }
    return true;
};

export const isValidEmail: ValidMiddlewareFN = async (email = "") => {
    const isValidEmail = await User.findOne({ email });
    if (isValidEmail) {
        throw new Error("Correo / contraseña no son correctos");
    }
    return true;
};

export const isValidUserById: ValidMiddlewareFN = async (id = "") => {
    const isValidUser = await User.findById(id);
    if (!isValidUser) {
        throw new Error("Usuario inexistente");
    }
    return true;
};

export const isValidAuthLogin: ValidMiddlewareFN = async (email = "", { req: { body } }) => {
    const user = await User.findOne({ email });

    const isValidPassword = await bycript.compare(body.password, user?.password as string);
    if (!isValidPassword) {
        throw new Error("Correo / contraseña no son correctos");
    }
    return true;
};
