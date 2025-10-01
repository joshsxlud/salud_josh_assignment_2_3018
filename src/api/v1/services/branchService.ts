import { branches, Branch } from "../../../data/branches";

export const getAllBranches = async (): Promise<Branch[]> => {
    
    return structuredClone(branches);
};

export const makeBranch = async (branchData: Omit<Branch, "id">
): Promise<Branch> => {
    const newBranch: Branch = {
        id: branches.length + 1,
        name: branchData.name,
        address: branchData.address,
        phoneNumber: branchData.phoneNumber
    };

    branches.push(newBranch);
    return newBranch;
};

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

export const updateBranch = async (
    id: number,
    branchData: Pick<Branch, "address" | "phoneNumber">
): Promise<Branch> => {

    const index: number = branches.findIndex((branch: Branch) => branch.id === id);

    if (index === -1) {
        throw new Error("Branch not found.");
    }
    // Allowed fields
    const allowedFields = ["phoneNumber", "address"];

    // Compare incoming fields with allowed fields 
    const invalidFields: String[] = Object.keys(branchData).filter(key => !allowedFields.includes(key));
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

export const deleteBranch = async (id: number): Promise<Branch> => {

    const index: number = branches.findIndex((branch: Branch) => branch.id === id);

    if (index === -1) {
        throw new Error("branch not found.");
    }

    // Remove employee from the array
    const [deletedBranch] = branches.splice(index, 1);

    return deletedBranch;
};