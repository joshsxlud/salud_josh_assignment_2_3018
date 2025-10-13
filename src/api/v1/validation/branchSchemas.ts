import Joi from "joi";

export const branchSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().trim(),
    address: Joi.string().trim(),
    phoneNumber: Joi.number()
});

const branchKeys: string[] = Object.keys(branchSchema.describe().keys);

export const createBranchSchema: Joi.ObjectSchema = branchSchema
    .fork(branchKeys, key => key.required())
    .keys({
        phoneNumber: Joi.number().min(1000000000).max(9999999999)
    })
    .unknown(false);
