import { employees, Employee } from "../../../data/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
    
    return structuredClone(employees);
};