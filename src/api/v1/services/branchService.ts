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
