import { branches, Branch } from "../../../data/branches";

export const getAllBranches = async (): Promise<Branch[]> => {
    
    return structuredClone(branches);
};
