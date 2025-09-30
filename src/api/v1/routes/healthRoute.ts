import { Router, Request, Response } from "express";

const healthRouter = Router();

healthRouter.get("/", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

export default healthRouter;