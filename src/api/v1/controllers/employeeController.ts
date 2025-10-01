import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "src/data/employees";
import { HTTP_STATUS } from "../../constants/httpConstants";

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
    
    try{
        const employees: Employee[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json({message: "Get all employees", data: employees});
        
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Failed to retrieve employees."})
    }
    
    
};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const employeeData: Omit<Employee, "id"> = req.body;

        if (!employeeData.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Name is required."})
        }

        if (!employeeData.position) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Position is required."})
        }

        if (!employeeData.department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Department is required."})
        }

        if (!employeeData.email) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Email is required."})
        }

        if (!employeeData.phoneNumber) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Phone number is required."})
        }

        if (!employeeData.branchId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Branch Id is required."})
        }

        const newEmployee = await employeeService.makeEmployee(employeeData)
        res.status(HTTP_STATUS.CREATED).json({message: "Employee has been created.", data: newEmployee})
        
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Failed to create an employee."})
    }

};