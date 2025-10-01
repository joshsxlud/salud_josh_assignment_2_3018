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

