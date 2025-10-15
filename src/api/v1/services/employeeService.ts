import { 
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot
 } from "firebase-admin/firestore";
import { employees, MatchingBranches, MatchingDepartment } from "../../../data/employees";
import { Employee } from "../models/employeeModel"
import { 
    createDocument,
    getDocuments,
    getDocumentById, 
    deleteDocument,
    updateDocument} from "../repositories/repositoryFunctions";

/**
 * A service to retrieve all employees.
 * 
 * @returns - A structured clone of all of the employees to avoid
 *            direct mutation.
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments("employees");
        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as unknown as Employee;
        });
        return employees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * A service to create new employees.
 * 
 * @param employeeData - Data of the employee being created.
 * @returns - The newly created employee object.
 */
export const makeEmployee = async (employeeData: Omit<Employee, "id">
): Promise<Employee> => {

    // // Find employee ids and sort
    // const employeeIds: number[] = employees.map(employee => employee.id).sort((a, b) => a - b);

    // // Generate new id
    // for (const id of employeeIds) {
    //     if (id !== newId) {
    //         break; 
    //     }
    //     newId = id + 1;
    // }

    // const newEmployee: Employee = {
    //     id: newId,
    //     name: employeeData.name,
    //     position: employeeData.position,
    //     department: employeeData.department,
    //     email: employeeData.email,
    //     phoneNumber: employeeData.phoneNumber,
    //     branchId: employeeData.branchId
    // };

    // employees.push(newEmployee);
    // return newEmployee;
    try {
        const newEmployee: Partial<Employee> = {
            ...employeeData
        }

        const employeeId: string = await createDocument<Employee>("employees", newEmployee)
        return structuredClone({id: employeeId, ...newEmployee} as Employee)
    } catch (error: unknown){
        throw error;
    }
};

/**
 * A service to retrieve employees by their id.
 * 
 * @param id - The id of the employee being searched.
 * @returns - A structured clone of the employee object to avoid
 *            direct mutation.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    // let employeeById: Employee | undefined;

    // for (const employee of employees) {
    //     if (employee.id === id) {

    //         employeeById = employee;
    //         break;
    //     }
    // }

    // if (!employeeById) {
    //     throw new Error("Employee not found.");
    // }

    // return structuredClone(employeeById);
        try {
        const doc: DocumentSnapshot | null = await getDocumentById(
            "employees",
            id
        );

        if (!doc) {
            throw new Error(`Employee with Id ${id} not found`);
        }

        const data: DocumentData | undefined = doc.data();
        const employee: Employee = {
            id: doc.id,
            ...data,
        } as unknown as Employee;

        return structuredClone(employee);
    } catch (error: unknown) {
        throw error;
    }
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
    id: string,
    employeeData: Pick<Employee, "position" | "department" | "email" | "phoneNumber" | "branchId">
): Promise<Employee> => {

    try {
        const employee: Employee = await getEmployeeById(id);
    
        if (!employee) {
            throw new Error(`Employee with Id ${id} not found`);
        }
    
        const updatedEmployee: Employee = {
            ...employee
        };
        
        if (employeeData.branchId !== undefined) updatedEmployee.branchId = employeeData.branchId;
        if (employeeData.department !== undefined) updatedEmployee.department = employeeData.department
        if (employeeData.email !== undefined) updatedEmployee.email = employeeData.email
        if (employeeData.position !== undefined) updatedEmployee.position = employeeData.position
        if (employeeData.phoneNumber !== undefined) updatedEmployee.phoneNumber = employeeData.phoneNumber
    
        await updateDocument<Employee>("employees", id, updatedEmployee);
    
        return structuredClone(updatedEmployee);
    } catch (error: unknown){
        throw new Error ("Could not update employee.")
    }



    
};

/**
 * A service to delete an employee. 
 * 
 * @param id - The id of the employee being deleted.
 * @returns - The deleted employee object.
 */
export const deleteEmployee = async (id: string): Promise<void> => {

    // const index: number = employees.findIndex((employee: Employee) => employee.id === id);

    // if (index === -1) {
    //     throw new Error("Employee not found.");
    // }

    // // Remove employee from the array
    // const [deletedEmployee] = employees.splice(index, 1);

    // return deletedEmployee;
    const employee: Employee = await getEmployeeById(id);
    try {
        if (!employee) {
            throw new Error(`Cannot find employee with Id ${id} not found.`)
        }

        await deleteDocument("employees", id);
    } catch (error: unknown ) {
        throw new Error;
    }
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
