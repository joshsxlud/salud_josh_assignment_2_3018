import { employees, Employee, MatchingBranches, MatchingDepartment } from "../../../data/employees";

/**
 * A service to retrieve all employees.
 * 
 * @returns - A structured clone of all of the employees to avoid
 *            direct mutation.
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    
    return structuredClone(employees);
};

/**
 * A service to create new employees.
 * 
 * @param employeeData - Data of the employee being created.
 * @returns - The newly created employee object.
 */
export const makeEmployee = async (employeeData: Omit<Employee, "id">
): Promise<Employee> => {
    let newId: number = 1;

    // Find employee ids and sort
    const employeeIds: number[] = employees.map(employee => employee.id).sort((a, b) => a - b);

    // Generate new id
    for (const id of employeeIds) {
        if (id !== newId) {
            break; 
        }
        newId = id + 1;
    }

    const newEmployee: Employee = {
        id: newId,
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

/**
 * A service to retrieve employees by their id.
 * 
 * @param id - The id of the employee being searched.
 * @returns - A structured clone of the employee object to avoid
 *            direct mutation.
 */
export const getEmployeeById = async (id: number): Promise<Employee> => {
    let employeeById: Employee | undefined;

    for (const employee of employees) {
        if (employee.id === id) {

            employeeById = employee;
            break;
        }
    }

    if (!employeeById) {
        throw new Error("Employee not found.");
    }

    return structuredClone(employeeById);
};

/**
 * A service to update employee information.
 * 
 * @param id - The id of the employee being updated.
 * @param employeeData - The data being updated.
 * @returns - A structured clone of the updated employee to avoid
 *            direct mutation.
 */
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

/**
 * A service to delete an employee. 
 * 
 * @param id - The id of the employee being deleted.
 * @returns - The deleted employee object.
 */
export const deleteEmployee = async (id: number): Promise<Employee> => {

    const index: number = employees.findIndex((employee: Employee) => employee.id === id);

    if (index === -1) {
        throw new Error("Employee not found.");
    }

    // Remove employee from the array
    const [deletedEmployee] = employees.splice(index, 1);

    return deletedEmployee;
};

/**
 * A service to retrieve employees working at the same branch.
 * 
 * @param branchId - The id of the branch being searched.
 * @returns - An array of employees that work at the same branch.
 */
export const getEmployeesByBranch = async (branchId: number): Promise<MatchingBranches[]> => {
    const matchingBranches: MatchingBranches[] = [];

    for (const employee of employees) {
        if (employee.branchId === branchId) {
            
            const {branchId, name, department} = employee;

            matchingBranches.push({branchId, name, department})
        }
    }

    // When branchId does not match any employees
    if (matchingBranches.length === 0) {
        throw new Error("This branch has no employees.");
    }

    return matchingBranches;
};

/**
 * A service to retrieve employees that work in the same branch.
 * 
 * @param department - The department being searched.
 * @returns - An array of employees in the same department.
 */
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
