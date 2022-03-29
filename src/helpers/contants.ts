import { Request } from "express";
import { CustomValidator } from "express-validator";
import { IUser } from "interfaces";

import { TypeQueryParams } from "../controllers";

// Type Middleware
export type TypeValidedFields = (key: string, ctx: { req: Request }) => Promise<boolean> | never;

export type TypeValidateMiddleware = CustomValidator & TypeValidedFields;

export type TypeGenerateJWT = (payload: { uid: string }) => Promise<string | undefined> | never;

// Type Pagination
export type TypePagination = { skipePage: number; limitPage: number; itemsPage: number };

export type TypePaginationRes = (query: TypeQueryParams) => TypePagination;
