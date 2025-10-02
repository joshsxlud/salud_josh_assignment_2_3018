import { employees, Employee, MatchingBranches, MatchingDepartment } from "../../../data/employees";

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

    return structuredClone(employeeById);
};

export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employee, "position" | "department" | "email" | "phoneNumber" | "branchId">
): Promise<Employee> => {

    const index: number = employees.findIndex((employee: Employee) => employee.id === id);

    if (index === -1) {
        throw new Error("Employee not found.");
    }
    // Allowed fields
    const allowedFields: string[] = ["position", "department", "email", "phoneNumber", "branchId"];

    // Compare incoming fields with allowed fields 
    const invalidFields: string[] = Object.keys(employeeData).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
        throw new Error(`Invalid field(s) provided: ${invalidFields.join(", ")}`);
    }

    const updatedEmployee: Employee = {
        ...employees[index],
        ...employeeData
    };

    // Update employee array with updated fields
    employees[index] = updatedEmployee;

    return structuredClone(employees[index]);
};

export const deleteEmployee = async (id: number): Promise<Employee> => {

    const index: number = employees.findIndex((employee: Employee) => employee.id === id);

    if (index === -1) {
        throw new Error("Employee not found.");
    }

    // Remove employee from the array
    const [deletedEmployee] = employees.splice(index, 1);

    return deletedEmployee;
};

export const getEmployeesByBranch = async (branchId: number): Promise<MatchingBranches[]> => {
    const matchingBranches: MatchingBranches[] = [];

    for (const employee of employees) {
        if (employee.branchId === branchId) {
            
            const { branchId, name, department} = employee;

            matchingBranches.push({branchId, name, department})
        }
    }

    // When branchId does not match any employees
    if (matchingBranches.length === 0) {
        throw new Error("This branch has no employees.");
    }

    return matchingBranches;
};

export const getEmployeesByDepartment = async (department: string): Promise<MatchingDepartment[]> => {
    const MatchingDepartments: MatchingDepartment[] = [];

    for (const employee of employees) {
        if (employee.department === department) {
            
            const { branchId, name, department} = employee;

            MatchingDepartments.push({branchId, name, department})
        }
    }

    // When the department does not match any employees
    if (MatchingDepartments.length === 0) {
        throw new Error("This department has no employees.");
    }

    return MatchingDepartments;
};