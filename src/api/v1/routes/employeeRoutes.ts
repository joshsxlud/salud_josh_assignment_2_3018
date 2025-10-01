import express, { Router } from "express";
import { 
    getAllEmployees,
    createEmployee 

} from "../controllers/employeeController";
const employeeRouter: Router = express.Router();

// get all
employeeRouter.get("/employees", getAllEmployees);

// // get by id
// employeeRouter.get("/employees/:id");

// create employee
employeeRouter.post("/employees", createEmployee);

// // update employee
// employeeRouter.put("/employees/:id")

// // delete employee
// employeeRouter.delete("/employees/:id");

export default employeeRouter;