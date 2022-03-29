import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { TypePaths } from "./contants";
import { connectToDatabase } from "../database";
import { userRoutes, authRoutes } from "../routes";

const HOST_PORT = parseInt(process.env.PORT as string, 10);

class Server {
    private port: number;
    private app: Application;
    private paths: TypePaths;

    public constructor() {
        this.app = express();
        this.port = HOST_PORT;
        this.paths = {
            Auth: "/api/auth",
            Users: "/api/users",
            Products: "/api/users",
        };

        // Connect to DB
        this.connectDB();

        // Middleware
        this.middleware();

        // Routes
        this.routes();
    }

    private async connectDB() {
        await connectToDatabase();
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use(morgan("tiny"));
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    private routes() {
        this.app.use(this.paths.Auth, authRoutes);
        this.app.use(this.paths.Users, userRoutes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on PORT: http://localhost:${this.port}`);
        });
    }
}

export default Server;
