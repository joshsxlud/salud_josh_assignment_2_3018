import express, { Express } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import { validationMiddleware } from "../src/api/v1/middleware/validationMiddleware";

const app: Express = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(validationMiddleware);

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"       
    });
});

app.use("/api/v1", employeeRoutes);
app.use("/api/v1", branchRoutes);

export default app;