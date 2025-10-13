import Joi from "joi";

const employeeSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().trim(),
    position: Joi.string().trim(),
    department: Joi.string().trim(),
    email: Joi.string().trim(),
    phoneNumber: Joi.number(),
    branchId: Joi.number()
});

const employeeKeys: string[] = Object.keys(employeeSchema.describe().keys);

export const createEmployeeSchema: Joi.ObjectSchema = employeeSchema
    .keys({
        email: Joi.string().email({tlds: {allow: ["com"]}})
    })
    .fork(employeeKeys, key => key.required())
    .unknown(false);

export const updateEmployeeSchema: Joi.ObjectSchema = employeeSchema
    .keys({
        id: Joi.number().forbidden(),
        name: Joi.string().forbidden()
    })
    .fork(["position", "department", "email", "phoneNumber", "branchId"], key => key.optional())
    .unknown(false);

export const deleteEmployeeSchema: Joi.ObjectSchema = Joi.object({
    id: Joi.number().required()
});
