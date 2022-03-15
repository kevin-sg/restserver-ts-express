import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { userRoutes, authRoutes } from "../routes";
import { connectToDatabase } from "../database";

interface Paths {
    users: string;
    auth: string;
}

class Server {
    public app: Application;
    public port: number;
    public paths: Paths;

    public constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT as string, 10);
        this.paths = {
            auth: "/api/auth",
            users: "/api/users",
        };

        // Connect to DB
        this.connectDB();

        // Middleware
        this.middleware();

        // Routes
        this.routes();
    }

    public async connectDB() {
        await connectToDatabase();
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use(morgan("tiny"));
        this.app.use(express.json());

        // Directory public
        this.app.use(express.static("public"));
    }

    private routes() {
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.users, userRoutes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on PORT: http://localhost:${this.port}`);
        });
    }
}

export default Server;
