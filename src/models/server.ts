import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { userRoutes } from "../routes";
import { connectToDatabase } from "../database";

interface Paths {
    users: string;
}

class Server {
    public app: Application;
    public port: number;
    public paths: Paths;

    public constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT as string, 10);
        this.paths = {
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
        // Directory public
        this.app.use(express.static("public"));
        this.app.use(cors());
        this.app.use(morgan("tiny"));
        this.app.use(express.json());
    }

    private routes() {
        this.app.use(this.paths.users, userRoutes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(
                `Server listening on PORT: http://localhost:${this.port}`
            );
        });
    }
}

export default Server;
