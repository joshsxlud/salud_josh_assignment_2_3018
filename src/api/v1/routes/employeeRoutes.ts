import express, { Router } from "express";

const employeeRouter: Router = express.Router();

// get all
employeeRouter.get("/employees");

// get by id
employeeRouter.get("/employees/:id");

// create employee
employeeRouter.post("/employees");

// update employee
employeeRouter.put("/employees/:id")

// delete employee
employeeRouter.delete("/employees/:id");
