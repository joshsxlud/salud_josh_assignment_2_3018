import { createEmployeeSchema, updateEmployeeSchema, deleteEmployeeSchema } from "../validation/employeeSchemas";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HTTP_STATUS } from "../../constants/httpConstants";

export const validationMiddleware =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const reqPath: string = req.path;
    const reqMethod: string = req.method;

    console.log(req.path, req.method)

    let reqSchema: Joi.ObjectSchema | undefined;

    // Create employees
    if (reqPath === "/api/v1/employees" && reqMethod === "POST" ) {
        reqSchema = createEmployeeSchema;
    }

    // Update employees
    if (reqPath.startsWith("/api/v1/employees/") && reqMethod === "PUT") {
        reqSchema = updateEmployeeSchema;
    }

    // Delete Employees
    if (req.path.startsWith("/api/v1/employees/") && reqMethod === "DELETE") {
        reqSchema = deleteEmployeeSchema;

        const { error, value } = reqSchema.validate(req.params);

        req.body = value;

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: error.message});
            next(error);
        }
    }

    if (!reqSchema) {             // DELETE LATER
        console.log(reqSchema);   // FOR DEBUG PURPOSES
        return next();            // :)
    }

    console.log(reqSchema);

    const { error, value } = reqSchema.validate(req.body);


    if (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: error.message})
        return next(error);
    }

    req.body = value;
    next();
}