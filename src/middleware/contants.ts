import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces";

// Type Middleware
export type TypeExtendRequest = Request & { user?: IUser };

export type TypePayloadUser = { uid: string };

export type TypeMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export type TypeValidedMiddleware = (
    req: TypeExtendRequest,
    res: Response,
    next: NextFunction
) => void;

export type TypeHasValidRole = ([...key]: string[]) => TypeValidedMiddleware;
