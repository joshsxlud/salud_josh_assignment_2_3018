import { employees, Employee } from "../../../data/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
    
    return structuredClone(employees);
};

export const makeEmployee = async (employeeData: Omit<Employee, "id">
): Promise<Employee> => {
    const newEmployee: Employee = {
        id: employees.length + 1,
        name: employeeData.name,
        position: employeeData.position,
        department: employeeData.department,
        email: employeeData.email,
        phoneNumber: employeeData.phoneNumber,
        branchId: employeeData.branchId
    };

    employees.push(newEmployee);
    return newEmployee;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
    let employeeById: Employee | undefined;

    for (const employee of employees) {
        if (employee.id === id) {

            // Assign as a copy
            employeeById = {...employee};
        }
    }

    if (!employeeById) {
        throw new Error("Employee not found.");
    }

    return employeeById;
};
