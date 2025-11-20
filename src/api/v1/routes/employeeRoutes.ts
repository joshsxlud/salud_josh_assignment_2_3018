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
 *    responses:
 *     '200:':
 *      description: Employees successfully retrieved.
 *      content: 
 *        application/json
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *            name:
 *              type: string
 *            position:
 *              type: string
 *            department: 
 *              type: string
 *            email: 
 *              type: string
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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

employeeRouter.put("/employees/:id", updateEmployee);

// DELETE existing employees

employeeRouter.delete("/employees/:id", deleteEmployee);

// GET all employees with matching branches

employeeRouter.get("/employees/branches/:branchId", getEmployeesByBranch);

// GET all employees with matching departments

employeeRouter.get("/employees/departments/:department", getEmployeesByDepartment);

export default employeeRouter;
