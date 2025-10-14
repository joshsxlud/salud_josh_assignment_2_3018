import * as employeeValidators from "../validation/employeeSchemas";
import * as branchValidators from "../validation/branchSchemas"
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HTTP_STATUS } from "../../constants/httpConstants";

export const validationMiddleware =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const reqPath: string = req.path;
    const reqMethod: string = req.method;

    // console.log(req.path, req.method)

    let reqSchema: Joi.ObjectSchema | undefined;

    // EMPLOYEE VALIDATION

    // Create employees
    if (reqPath === "/api/v1/employees" && reqMethod === "POST" ) {
        reqSchema = employeeValidators.createEmployeeSchema;
    }

    // Update employees
    if (reqPath.startsWith("/api/v1/employees/") && reqMethod === "PUT") {
        reqSchema = employeeValidators.updateEmployeeSchema;
    }

    // BRANCH VALIDATION

    // Create branches
    if (reqPath === "/api/v1/branches" && reqMethod === "POST") {
        reqSchema = branchValidators.createBranchSchema;
    }

    // Update branches
    if (reqPath.startsWith("/api/v1/branches/") && reqMethod === "PUT") {
        reqSchema = branchValidators.updateBranchSchema;
    }


    if (!reqSchema) {             // DELETE LATER
        console.log(reqSchema);   // FOR DEBUG PURPOSES
        return next();
    }

    // console.log(reqSchema);

    const { error, value } = reqSchema.validate(req.body);


    if (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: error.message})
        next(error);
    }

    req.body = value;
    next();
}