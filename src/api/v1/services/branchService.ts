import { branches, Branch } from "../../../data/branches";

/**
 * A service to retrieve all branches.
 * 
 * @returns A structure clone of all the branches to avoid direct mutation.
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    
    return structuredClone(branches);
};

/**
 * A service to create new branches.
 * 
 * @param branchData - Information of the branch.
 * @returns - The newly created branch.
 */
export const makeBranch = async (branchData: Omit<Branch, "id">
): Promise<Branch> => {

    let newId: number = 1;

    // Find branch ids and sort
    const branchIds: number[] = branches.map(branch => branch.id).sort((a, b) => a - b);

    // Generate new id
    for (const id of branchIds) {
        if (id !== newId) {
            break; 
        }
        newId = id + 1;
    }

    const newBranch: Branch = {
        id: newId,
        name: branchData.name,
        address: branchData.address,
        phoneNumber: branchData.phoneNumber
    };

    branches.push(newBranch);
    return newBranch;
};

/**
 * A service to retrieve branches by their id.
 * 
 * @param id - The id of the branch being searched.
 * @returns - A restructured clone of the branch object to avoid direct mutation
 *            of the branch object. 
 */
export const getBranchById = async (id: number): Promise<Branch> => {
    let branchById: Branch | undefined;

    for (const branch of branches) {
        if (branch.id === id) {

            // Assign as a copy
            branchById = {...branch};
        }
    }

    if (!branchById) {
        throw new Error("Branch not found.");
    }

    return structuredClone(branchById);
};

/**
 * A service to update an existing branch.
 * 
 * @param id - The id of the branch being updated.
 * @param branchData - The information being updated. 
 * @returns - A structured clone of the updated branch to avoid direct mutation
 *            of the branch object.
 */
export const updateBranch = async (
    id: number,
    branchData: Pick<Branch, "address" | "phoneNumber">
): Promise<Branch> => {

    const index: number = branches.findIndex((branch: Branch) => branch.id === id);

    if (index === -1) {
        throw new Error("Branch not found.");
    }

    // Allowed fields
    const allowedFields: string[] = ["phoneNumber", "address"];

    // Compare incoming fields with allowed fields 
    const invalidFields: string[] = Object.keys(branchData).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
        throw new Error(`Invalid field(s) provided: ${invalidFields.join(", ")}`);
    }

    const updatedBranch: Branch = {
        ...branches[index],
        ...branchData
    };

    // Update employee array with updated fields
    branches[index] = updatedBranch;

    return structuredClone(branches[index]);
};

/**
 * A service to delete an existing branch.
 * 
 * @param id - The id of the branch being deleted.
 * @returns - The deleted branch object.
 */
export const deleteBranch = async (id: number): Promise<Branch> => {

    const index: number = branches.findIndex((branch: Branch) => branch.id === id);

    if (index === -1) {
        throw new Error("branch not found.");
    }

    // Remove employee from the array
    const [deletedBranch] = branches.splice(index, 1);

    return deletedBranch;
};