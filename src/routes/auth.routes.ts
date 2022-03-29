import { Router, IRouter } from "express";
import { check } from "express-validator";

import { isValidAuthLogin } from "../helpers";
import { validationField } from "../middleware";
import { AuthControllers } from "../controllers";

class AuthRoute {
    public authRouter: IRouter;

    public constructor() {
        this.authRouter = Router();

        this.routePost();
    }

    // POST /api/auth/login
    private routePost() {
        this.authRouter.post(
            "/login",
            [
                check("email", "El correo es obligatorio").isEmail(),
                check("password", "La contraseña es obligatoria").notEmpty(),
                check("email").custom(isValidAuthLogin),
                validationField,
            ],
            AuthControllers.postUser
        );
    }
}

export default new AuthRoute().authRouter;
