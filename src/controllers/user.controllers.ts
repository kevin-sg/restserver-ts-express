import { Request, Response, NextFunction } from "express";
import { IUser } from "interfaces";

class UserController {
    constructor() {
        this.getUsers = this.getUsers.bind(this);
        this.postUser = this.postUser.bind(this);
        this.upateUser = this.upateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    public getUsers(req: Request, res: Response, next: NextFunction): void {
        const { q, name, apikey } = req.query;

        res.status(200).json({ msg: "get api", q, name, apikey });
    }

    public postUser({ body }: Request, res: Response, next: NextFunction): void {
        const user: IUser = body;

        res.status(201).json({ success: true, user });
    }

    public upateUser(req: Request, res: Response, next: NextFunction): void {
        res.status(201).json({ msg: "update api" });
    }

    public deleteUser(req: Request, res: Response, next: NextFunction): void {
        res.status(201).json({ msg: "delete api" });
    }
}

export default new UserController();
