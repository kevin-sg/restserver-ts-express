import { Router, IRouter } from "express";
import { check } from "express-validator";

import { validationField, validateJWT, isAdminRole } from "../middleware";
import { isValidEmail, isValidRole, isValidUserById } from "../helpers";
import { UserControllers } from "../controllers";

class UserRoute {
    public userRoute: IRouter;

    public constructor() {
        this.userRoute = Router();

        this.routeGet();
        this.routePost();
        this.routePut();
        this.routeDelete();
    }

    // GET /api/users
    private routeGet() {
        this.userRoute.get("/", UserControllers.getUsers);
    }

    // POST /api/users
    private routePost() {
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
            UserControllers.postUser
        );
    }

    // PUT /api/users/:id
    private routePut() {
        this.userRoute.put(
            "/:id",
            [
                check("id", "No es un ID válido de Mongo").isMongoId(),
                check("id").custom(isValidUserById),
                check("role").custom(isValidRole),
                validationField,
            ],
            UserControllers.updateUser
        );
    }

    // DELETE /api/users/:id
    private routeDelete() {
        this.userRoute.delete(
            "/:id",
            [
                validateJWT,
                isAdminRole,
                check("id", "No es un ID válido de Mongo").isMongoId(),
                check("id").custom(isValidUserById),
                validationField,
            ],
            UserControllers.deleteUser
        );
    }
}

export default new UserRoute().userRoute;
