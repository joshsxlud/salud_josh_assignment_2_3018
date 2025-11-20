import express, { Router } from "express";
import { 
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getEmployeesByBranch,
    getEmployeesByDepartment

} from "../controllers/employeeController";

 // Router handling employee routes
const employeeRouter: Router = express.Router();

// GET all employees
/**
 * @openapi
 * /employees:
 *  get:
 *    summary: Retrieve a list of employees
 *    tags: [Employee]
 *    responses:
 *     '200:':
 *      description: Employees successfully retrieved.
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              position:
 *                type: string
 *              department: 
 *                type: string
 *              email: 
 *                type: string
 *            phoneNumber:
 *              type: number
 *            branchId:
 *              type: number
 */
employeeRouter.get("/employees", getAllEmployees);

// GET employees by id

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Retrieve an employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                position:
 *                  type: string
 *                department:
 *                  type: string
 *                email:
 *                  type: string
 *                phoneNumber:
 *                  type: number
 *                branchId:
 *                  type: number
 */
employeeRouter.get("/employees/:id", getEmployeeById);

// POST new employees

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - department
 *               - email
 *               - phoneNumber
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               branchId:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Employee successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                position:
 *                  type: string
 *                department:
 *                  type: string
 *                email:
 *                  type: string
 *                phoneNumber:
 *                  type: number
 *                branchId:
 *                  type: number
 *       '400':
 *          description: Could not create employee.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                    example: Could not create employee.
 */
employeeRouter.post("/employees", createEmployee);

// PUT existing employees

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update a specific employee's information
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the employee
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - department
 *               - email
 *               - phoneNumber
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               branchId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Employee updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 position:
 *                   type: string
 *                 department:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 branchId:
 *                   type: integer
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
employeeRouter.put("/employees/:id", updateEmployee);

// DELETE existing employees

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the employee
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Employee deleted successfully."
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Employee not found."
 */
employeeRouter.delete("/employees/:id", deleteEmployee);

// GET all employees with matching branches
/**
 * @openapi
 * /employees/branches/{branchId}:
 *   get:
 *     summary: Retrieve employees by branch ID
 *     tags: [Employee]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the branch
 *     responses:
 *       '200':
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       position:
 *                         type: string
 *                       department:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       branchId:
 *                         type: integer
 *       '404':
 *         description: No employees found for the given branch ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "No employees found for the given branch ID."
 */
employeeRouter.get("/employees/branches/:branchId", getEmployeesByBranch);

// GET all employees with matching departments
/**
 * @openapi
 * /employees/departments/{department}:
 *   get:
 *     summary: Retrieve employees by department
 *     tags: [Employee]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [HR, Sales, IT, Operations]
 *         description: The department name to filter employees
 *     responses:
 *       '200':
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       position:
 *                         type: string
 *                       department:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       branchId:
 *                         type: integer
 *       '404':
 *         description: No employees found for the given department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "No employees found for the given department."
 */
employeeRouter.get("/employees/departments/:department", getEmployeesByDepartment);

export default employeeRouter;
