import { createEmployeeSchema, updateEmployeeSchema } from "../validation/employeeSchemas";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HTTP_STATUS } from "../../constants/httpConstants";






export const validationMiddleware =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const reqPath: string = req.path;
    const reqMethod: string = req.method;

    console.log(req.path, req.method)

    let reqSchema: Joi.ObjectSchema | undefined;
    if (reqPath === "/api/v1/employees" && reqMethod === "POST" ) {
        reqSchema = createEmployeeSchema;
    }

    if (reqPath.startsWith("/api/v1/employees/") && reqMethod === "PUT") {
        reqSchema = updateEmployeeSchema;
    }

    if (!reqSchema) {
        console.log(reqSchema)
        return next();
    }

    console.log(reqSchema);
    const { error, value } = reqSchema.validate(req.body);


    if (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: error.message});
    }

    req.body = value;
    next();
}