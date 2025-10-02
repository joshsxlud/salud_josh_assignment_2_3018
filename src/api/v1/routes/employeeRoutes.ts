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
employeeRouter.get("/employees", getAllEmployees);

// GET employees by id
employeeRouter.get("/employees/:id", getEmployeeById);

// POST new employees
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
