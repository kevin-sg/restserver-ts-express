import { CustomValidator } from "express-validator";

import { User, Role } from "../models";

type ValidedParams = (key: string) => Promise<boolean> | never;

export const isValidRole: CustomValidator & ValidedParams = async (role = "") => {
    const isValueRole = await Role.findOne({ role });
    if (!isValueRole) {
        throw new Error(`Rol ${role} no está registrado en la BD`);
    }
    return true;
};

export const isValidEmail: CustomValidator & ValidedParams = async (email = "") => {
    const isValidEmail = await User.findOne({ email });
    if (isValidEmail) {
        throw new Error("El correo ya esta registrado");
    }
    return true;
};

export const isValidUserById: CustomValidator & ValidedParams = async (id = "") => {
    const isValidUser = await User.findById(id);
    if (!isValidUser) {
        throw new Error("Usuario inexistente");
    }
    return true;
};
