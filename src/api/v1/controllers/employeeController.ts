import { NextFunction, Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "src/data/employees";
import { HTTP_STATUS } from "../../constants/httpConstants";

export const getAllEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try{
        const employees: Employee[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json({message: "Get all employees", data: employees});
        
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Failed to retrieve employees."});
        next(error);
    }

};

export const createEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const employeeData: Omit<Employee, "id"> = req.body;

        // Validate inputs
        if (!employeeData.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Name is required."});
        }

        if (!employeeData.position) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Position is required."});
        }

        if (!employeeData.department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Department is required."});
        }

        if (!employeeData.email) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Email is required."});
        }

        if (!employeeData.phoneNumber) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Phone number is required."});
        }

        if (!employeeData.branchId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Branch Id is required."});
        }
        // TODO: Destructure later 
        const newEmployee = await employeeService.makeEmployee(employeeData);
        res.status(HTTP_STATUS.CREATED).json({message: "Employee has been created.", data: newEmployee});
        
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Failed to create an employee."});
        next(error);
    }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const employee: Employee = await employeeService.getEmployeeById(id);
        res.status(HTTP_STATUS.OK).json({message: "Employee Found", data: employee});
    }
    catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: String(error)});
        next(error);
    }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const employeeData: Pick<Employee, "position" | "branchId" | "department" | "email" | "phoneNumber"> = req.body;

        const updatedEmployee = await employeeService.updateEmployee(id, employeeData);

        res.status(HTTP_STATUS.OK).json({message: "Employee information updated.", data: updatedEmployee});
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Could not update employee."});
        next(error);
    }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id= parseInt(req.params.id);
        const deletedEmployee: Employee = await employeeService.deleteEmployee(id);

        res.status(HTTP_STATUS.OK).json({message: "Employee Deleted.", data: deletedEmployee});
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: String(error)});
        next(error);
    }
};