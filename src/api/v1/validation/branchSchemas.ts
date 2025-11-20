import Joi from "joi";

// Base schema for a branch.
export const branchSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().trim(),
    address: Joi.string().trim(),
    phoneNumber: Joi.number()
});

const branchKeys: string[] = Object.keys(branchSchema.describe().keys);

// Validation schema for creating branches.
export const createBranchSchema: Joi.ObjectSchema = branchSchema
    .keys({
        // Ensure phone numbers are no less than or greater than 10 digits
        phoneNumber: Joi.number().min(1000000000).max(9999999999)
    })
    .fork(branchKeys, key => key.required())
    .unknown(false);

// Validation schema for updating branches.
export const updateBranchSchema: Joi.ObjectSchema = branchSchema
    .keys({
        id: Joi.number().forbidden(),
        name: Joi.string().forbidden()
    })
    .fork(["address", "phoneNumber"], key => key.optional())
    .unknown(false);
