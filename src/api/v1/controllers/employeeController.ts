import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "src/data/employees";

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
    try{
        const employees: Employee[] = await employeeService.getAllEmployees();

    res.status(200).json({message: "Get all employees", data: employees});
    } catch (error) {

        res.status(500).json({message: "Failed to retrieve employees."});
    }
};
