import { Router } from "express";
import { UserController } from "../controllers";

const RouterUser = Router();

class UserRoute {
    constructor() {
        // GET /api/users
        RouterUser.get("/", UserController.getUsers);
        // POST /api/user
        RouterUser.post("/", UserController.postUser);
        // PUT /api/user/:id
        RouterUser.put("/:id", UserController.upateUser);
        // DELETE /api/user/:id
        RouterUser.delete("/", UserController.deleteUser);
    }
}

new UserRoute();

export default RouterUser;
