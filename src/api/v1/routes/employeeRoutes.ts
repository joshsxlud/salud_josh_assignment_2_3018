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
const employeeRouter: Router = express.Router();

// get all
employeeRouter.get("/employees", getAllEmployees);

// get by id
employeeRouter.get("/employees/:id", getEmployeeById);

// create employee
employeeRouter.post("/employees", createEmployee);

// update employee
employeeRouter.put("/employees/:id", updateEmployee);

// delete employee
employeeRouter.delete("/employees/:id", deleteEmployee);

// get employees by branch
employeeRouter.get("/employees/branches/:branchId", getEmployeesByBranch);

// get employees by department
employeeRouter.get("/employees/departments/:department", getEmployeesByDepartment);

export default employeeRouter;
