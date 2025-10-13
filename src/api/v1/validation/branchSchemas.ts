import Joi from "joi";

export const branchSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().trim(),
    address: Joi.string().trim(),
    phoneNumber: Joi.number()
});

const branchKeys: string[] = Object.keys(branchSchema.describe().keys);

export const createBranchSchema: Joi.ObjectSchema = branchSchema
    .keys({
        // Ensure phone numbers are no less than or greater than 10 digits
        phoneNumber: Joi.number().min(1000000000).max(9999999999)
    })
    .fork(branchKeys, key => key.required())
    .unknown(false);

export const updateBranchSchema: Joi.ObjectSchema = branchSchema
    .keys({
        id: Joi.number().forbidden(),
        name: Joi.string().forbidden()
    })
    .fork(["address", "phoneNumber"], key => key.optional())
    .unknown(false);

export const deleteBranchSchema: Joi.ObjectSchema = Joi.object({
    id: Joi.number().required()
});