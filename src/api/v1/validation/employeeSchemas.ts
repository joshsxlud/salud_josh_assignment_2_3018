import Joi from "joi";

const employeeSchema: Joi.ObjectSchema = Joi.object().keys({
    name: Joi.string(),
    position: Joi.string(),
    department: Joi.string(),
    email: Joi.string(),
    phoneNumber: Joi.number(),
    branchId: Joi.number()
});

const employeeKeys: string[] = Object.keys(employeeSchema.describe().keys);

export const createEmployeeSchema: Joi.ObjectSchema = employeeSchema
    .fork(employeeKeys, key => key.required())
    .unknown(false);