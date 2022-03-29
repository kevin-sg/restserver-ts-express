import { Request, Response } from "express";

import { User } from "../models";
import { generateJWT } from "../helpers";

class AuthControllers {
    public constructor() {
        this.postUser = this.postUser.bind(this);
    }

    public async postUser({ body: { email } }: Request, res: Response): Promise<void> {
        try {
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
