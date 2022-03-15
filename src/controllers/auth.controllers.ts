import { Request, Response } from "express";

import { generateJWT } from "../helpers";
import { User } from "../models";

interface IUserLogin {
    email: string;
    password: string;
}

class AuthControllers {
    public constructor() {
        this.postUser = this.postUser.bind(this);
    }

    public async postUser(req: Request, res: Response): Promise<void> {
        try {
            const { email }: IUserLogin = req.body;

            const user = await User.findOne({ email });
            const token = await generateJWT({ uid: user?._id.toString() || "" });

            res.status(201)
                .cookie("Set-Cookie", token, {
                    path: "/api",
                    httpOnly: true,
                })
                .json({ success: true, user });
        } catch (err) {
            res.status(500).json({ error: "Hable con el adminstrador" });
        }
    }
}

export default new AuthControllers();
