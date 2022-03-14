import { Router, IRouter } from "express";
import { check } from "express-validator";

import { validationField } from "../middleware";
import { UserController } from "../controllers";
import { isValidEmail, isValidRole, isValidUserById } from "../helpers";

class UserRoute {
    public userRoute: IRouter;

    public constructor() {
        this.userRoute = Router();

        this.customGet();
        this.customPost();
        this.customPut();
        this.customDelete();
    }

    // GET /api/users
    private customGet() {
        this.userRoute.get("/", UserController.getUsers);
    }

    // POST /api/user
    private customPost() {
        this.userRoute.post(
            "/",
            [
                check("name", "El nombre es obligatorio").notEmpty(),
                check("email", "El email no es válido").isEmail(),
                check("email").custom(isValidEmail),
                check("password", "La contraseña debe ser más de 5 carácteres")
                    .notEmpty()
                    .isLength({ min: 6 }),
                check("role").custom(isValidRole),
                validationField,
            ],
            UserController.postUser
        );
    }

    // PUT /api/user/:id
    private customPut() {
        this.userRoute.put(
            "/:id",
            [
                check("id", "No es un ID válido de Mongo").isMongoId(),
                check("id").custom(isValidUserById),
                check("role").custom(isValidRole),
                validationField,
            ],
            UserController.updateUser
        );
    }

    // DELETE /api/user/:id
    private customDelete() {
        this.userRoute.delete(
            "/:id",
            [
                check("id", "No es un ID válido de Mongo").isMongoId(),
                check("id").custom(isValidUserById),
                validationField,
            ],
            UserController.deleteUser
        );
    }
}

export default new UserRoute().userRoute;
