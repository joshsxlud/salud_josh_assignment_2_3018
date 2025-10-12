import Joi from "joi";
import { Employee } from "../models/employeeModel";

export const createEmployeeValidator = Joi.object<Employee>({
    name: Joi.string().required(),
    position: Joi.string().required(),
    department: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    branchId: Joi.number().required()
});