import Joi from "joi";
import { Branch } from "../models/branchModel";

export const createBranchValidator = Joi.object<Branch>({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phoneNumber: Joi.number().required()
});