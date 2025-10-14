import { NextFunction, Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { MatchingBranches, MatchingDepartment } from "src/data/employees";
import { HTTP_STATUS } from "../../constants/httpConstants";
import { Employee }  from "../models/employeeModel";
import { successResponse, errorResponse } from "../models/responseModel";
/**
 * Controller to retrieve all employees.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Passes control to the next middleware.
 */
export const getAllEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const employees: Employee[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json(successResponse(employees, "Employees successfully retrieved."));
        
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Could not retrieve employees.", "HTTP_STATUS.BAD_REQUEST"));
        next(error);
    }

};

/**
 * Controller to create a new employee.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Passes control to the next middleware.
 */
export const createEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
            const {
                name,
                position,
                department,
                email,
                phoneNumber,
                branchId
            }: {
                name: string,
                position: string,
                department: string;
                email: string;
                phoneNumber: number;
                branchId: number;
            } = req.body;

        const employeeData: {
            name: string;
            position: string;
            department: string;
            email: string;
            phoneNumber: number;
            branchId: number;
        } = {
            name: name,
            position: position,
            department: department,
            email: email,
            phoneNumber: phoneNumber,
            branchId: branchId
        }

        const newEmployee: Employee = await employeeService.makeEmployee(employeeData);
        res.status(HTTP_STATUS.CREATED).json(successResponse(newEmployee, "Employee created successfully."));

    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Could not create employee.", "BAD REQUEST"));
        next(error);
    }
};

/**
 * Controller to retrieve an employee by their Id.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Passes control to the next middleware. 
 */
export const getEmployeeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        const employee: Employee = await employeeService.getEmployeeById(id);
        res.status(HTTP_STATUS.OK).json(successResponse(employee, "Employee Found."));
    }
    catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Could not find employee.", "NOT FOUND"));
        next(error);
    }
};

/**
 * Controller to update an existing employee's information.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Passes control to the next middleware.
 */
export const updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        const employeeData: Pick<Employee, "position" | "branchId" | "department" | "email" | "phoneNumber"> = req.body;

        const updatedEmployee: Employee = await employeeService.updateEmployee(id, employeeData);

        res.status(HTTP_STATUS.OK).json(successResponse(updatedEmployee, "Employee has been updated."));
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Could not find employee.", "NOT FOUND"));
        next(error);
    }
};

/**
 * Controller to delete an employee.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Passes control to the next middleware. 
 */
export const deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        const deletedEmployee: Employee = await employeeService.deleteEmployee(id);

        res.status(HTTP_STATUS.OK).json(successResponse(deletedEmployee, "Employee deleted successfully." ));
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Could not find employee.", "NOT FOUND"));
        next(error);
    }
};

/**
 * Controller to retrieve employees who's work at the same branch.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Passes control to the next middleware. 
 */
export const getEmployeesByBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const branchId: number = parseInt(req.params.branchId);
        const matchingBranches: MatchingBranches[] = await employeeService.getEmployeesByBranch(branchId);
        res.status(HTTP_STATUS.OK).json(successResponse(matchingBranches, `Employees belonging to branch ${branchId}.`));

    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Could not find employees.", "NOT FOUND"));
        next(error);
    }
};

/**
 * Controller to retrieve employees who work in the same department.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Passes control to the next middleware. 
 */
export const getEmployeesByDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const department: string = req.params.department;
        const MatchingDepartments: MatchingDepartment[] = await employeeService.getEmployeesByDepartment(department);
        res.status(HTTP_STATUS.OK).json(successResponse(MatchingDepartments, `Employees belonging to ${department} Department.`));
        
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Could not find employees.", "NOT FOUND"));
        next(error);
    }
};
