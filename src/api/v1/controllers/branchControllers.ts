import { NextFunction, Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "src/data/branches";
import { HTTP_STATUS } from "../../constants/httpConstants";

/**
 * Controller to retrieve all branches.
 * 
 * @param req - Express request object.
 * @param res - Express request object.
 * @param next - Passes control to the next middleware.
 */
export const getAllBranches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const branches: Branch[] = await branchService.getAllBranches();
        res.status(HTTP_STATUS.OK).json({message: "Get all branches", data: branches});

    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Failed to retrieve branches."});
        next(error);
    }

};

/**
 * Controller to create a new branch.
 * 
 * @param req - Express request object.
 * @param res - Express request object.
 * @param next - Passes control to the next middleware.
 */
export const makeBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const branchData: Omit<Branch, "id"> = req.body;

        // Validate inputs
        if (!branchData.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Name is required."});
        }

        if (!branchData.phoneNumber) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Phone number is required."});
        }

        if (!branchData.address) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Address is required."});
        }

        const newBranch: Branch = await branchService.makeBranch(branchData);

        res.status(HTTP_STATUS.CREATED).json({message: "Branch has been created.", data: newBranch});
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Failed to create a branch."});
        next(error);
    }
};

/**
 * Controller to retrieve a branch by it's Id.
 * 
 * @param req - Express request object.
 * @param res - Express request object.
 * @param next - Passes control to the next middleware.
 */
export const getBranchById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        const branch: Branch = await branchService.getBranchById(id);

        res.status(HTTP_STATUS.OK).json({message: "Branch Found", data: branch});
    }
    catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: String(error)});
        next(error);
    }
};

/**
 * Controller to update an existing branch's information.
 * 
 * @param req - Express request object.
 * @param res - Express request object.
 * @param next - Passes control to the next middleware.
 */
export const updateBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        const branchData: Pick<Branch, "address" | "phoneNumber"> = req.body;

        const updatedBranch: Branch = await branchService.updateBranch(id, branchData);

        res.status(HTTP_STATUS.OK).json({message: "Branch information updated.", data: updatedBranch});
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: String(error)});
        next(error);
    }
};

/**
 * Controller to delete an existing branch.
 * 
 * @param req - Express request object.
 * @param res - Express request object.
 * @param next - Passes control to the next middleware.
 */
export const deleteBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        const deletedBranch: Branch = await branchService.deleteBranch(id);

        res.status(HTTP_STATUS.OK).json({message: "Branch Deleted.", data: deletedBranch});
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: String(error)});
        next(error);
    }
};