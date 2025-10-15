import { Branch } from "../models/branchModel";
import { 
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot
 } from "firebase-admin/firestore";
import { 
    createDocument,
    getDocuments,
    getDocumentById, 
    deleteDocument,
    updateDocument} from "../repositories/repositoryFunctions";
/**
 * A service to retrieve all branches.
 * 
 * @returns A structure clone of all the branches to avoid direct mutation.
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments("branches");
        const branches: Branch[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as unknown as Branch;
        });
        return branches;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * A service to create new branches.
 * 
 * @param branchData - Information of the branch.
 * @returns - The newly created branch.
 */
export const makeBranch = async (branchData: Omit<Branch, "id">
): Promise<Branch> => {

    try {
        const newBranch: Partial<Branch> = {
            ...branchData
        }

        const branchId: string = await createDocument<Branch>("branches", newBranch)
        return structuredClone({id: branchId, ...newBranch} as Branch)
    } catch (error: unknown){
        throw error;
    }
};

/**
 * A service to retrieve branches by their id.
 * 
 * @param id - The id of the branch being searched.
 * @returns - A restructured clone of the branch object to avoid direct mutation
 *            of the branch object. 
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    try {
        const doc: DocumentSnapshot | null = await getDocumentById(
            "branches",
            id
        );

        if (!doc) {
            throw new Error(`Branch with Id ${id} not found`);
        }

        const data: DocumentData | undefined = doc.data();
        const branch: Branch = {
            id: doc.id,
            ...data,
        } as unknown as Branch;

        return structuredClone(branch);
    } catch (error: unknown) {
        throw error;
    }
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
    id: string,
    branchData: Pick<Branch, "address" | "phoneNumber">
): Promise<Branch> => {
    try {
        const branch: Branch = await getBranchById(id);
    
        if (!branch) {
            throw new Error(`Branch with Id ${id} not found`);
        }
    
        const updatedBranch: Branch = {
            ...branch
        };
        
        if (branchData.address !== undefined) updatedBranch.address = branchData.address
        if (branchData.phoneNumber !== undefined) updatedBranch.phoneNumber = branchData.phoneNumber
    
        await updateDocument<Branch>("branches", id, updatedBranch);
    
        return structuredClone(updatedBranch);
    } catch (error: unknown){
        throw new Error ("Could not update branch.")
    }
};

/**
 * A service to delete an existing branch.
 * 
 * @param id - The id of the branch being deleted.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const branch: Branch = await getBranchById(id);
    try {
        if (!branch) {
            throw new Error(`Cannot find branch with Id ${id} .`)
        }

        await deleteDocument("branches", id);
    } catch (error: unknown) {
        throw new Error;
    }
};