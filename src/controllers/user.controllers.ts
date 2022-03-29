import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { User } from "../models";
import { IUser } from "../interfaces";
import { TypeQueryParams } from "./contants";
import { paginationResponse } from "../helpers";

class UserControllers {
    public constructor() {
        this.getUsers = this.getUsers.bind(this);
        this.postUser = this.postUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const { page = 1, per_page = 5 } = req.query as TypeQueryParams;

            const { skipePage, limitPage, itemsPage } = paginationResponse({ page, per_page });

            const [total_count, results] = await Promise.all([
                User.countDocuments({ state: true }),
                User.find({ state: true }).skip(itemsPage).limit(limitPage).sort({ createdAt: -1 }),
            ]);

            res.status(200).json({
                success: true,
                page: skipePage > 0 ? skipePage : 1,
                per_page: limitPage,
                total_count,
                results,
            });
        } catch (err) {
            res.status(401).json({ error: "Not authorized" });
        }
    }

    public async postUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, ...rest } = req.body as IUser;

            const user = new User({ email, password, ...rest });
            user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            await user.save();

            res.status(201).json({ success: true, user });
        } catch (err) {
            res.status(401).json({ error: "Not authorized" });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { _id, google, ...rest } = req.body as IUser;

            if (rest.password) {
                rest.password = bcrypt.hashSync(rest.password, bcrypt.genSaltSync(10));
            }

            const user = await User.findByIdAndUpdate(id, rest, { new: true });

            res.status(201).json({ success: true, user });
        } catch (err) {
            res.status(401).json({ error: "Not authorized" });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            await User.findByIdAndUpdate(id, { state: false });

            res.status(201).json({ success: true, msg: "Usuario eliminado" });
        } catch (err) {
            res.status(401).json({ error: "Not authorized" });
        }
    }
}

export default new UserControllers();
