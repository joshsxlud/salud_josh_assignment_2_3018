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

/**
 * @openapi
 *   components:
 *     schemas:
 *      Employee:
 *        type: object
 *        required:
 *         - name
 *        - position
 *        - department
 *        - email
 *        - phoneNumber
 *        - branchId
 *       properties:
 *         name:
 *           type: string
 *         position:
 *           type: string
 *         department:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phoneNumber:
 *           type: number
 *         branchId:
 *           type: number
 */
export const createEmployeeSchema: Joi.ObjectSchema = employeeSchema
    .keys({
        email: Joi.string().email({tlds: {allow: ["com"]}})
    })
    .fork(employeeKeys, key => key.required())
    .unknown(false);


// Validation schema for updating an employee.
/**
 * @openapi
 *   components:
 *     schemas:
 *      UpdateEmployee:
 *        type: object
 *        properties:
 *         position:
 *           type: string
 *         department:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phoneNumber:
 *           type: number
 *         branchId:
 *           type: number
 */
export const updateEmployeeSchema: Joi.ObjectSchema = employeeSchema
    .keys({
        id: Joi.number().forbidden(),
        name: Joi.string().forbidden()
    })
    .fork(["position", "department", "email", "phoneNumber", "branchId"], key => key.optional())
    .unknown(false);
