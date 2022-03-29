import bycript from "bcryptjs";

import { IUser } from "../interfaces";
import { User, Role } from "../models";
import { TypeValidateMiddleware } from "./contants";

export const isValidRole: TypeValidateMiddleware = async (role = "") => {
    const isValueRole = await Role.findOne({ role });
    if (!isValueRole) {
        throw new Error(`Rol ${role} no está registrado en la BD`);
    }
    return true;
};

export const isValidEmail: TypeValidateMiddleware = async (email = "") => {
    const isValidEmail = await User.findOne({ email });
    if (isValidEmail) {
        throw new Error("Correo/contraseña no son correctos");
    }
    return true;
};

export const isValidUserById: TypeValidateMiddleware = async (id = "") => {
    const isValidUser = await User.findById(id);
    if (!isValidUser) {
        throw new Error("Usuario inexistente");
    }
    return true;
};

export const isValidAuthLogin: TypeValidateMiddleware = async (email = "", { req }) => {
    const { password } = req.body as IUser;

    const user = (await User.findOne({ email })) as IUser;

    const isValidPassword = await bycript.compare(password, user?.password);
    if (!isValidPassword) {
        throw new Error("Correo/contraseña no son correctos");
    }
    return true;
};
