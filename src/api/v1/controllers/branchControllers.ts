import { NextFunction, Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModel";
import { HTTP_STATUS } from "../../constants/httpConstants";
import { createBranchValidator } from "../validation/branchSchemas";

/**
 * Controller to retrieve all branches.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
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
 * @param res - Express response object.
 * @param next - Passes control to the next middleware.
 */
export const makeBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {
            name,
            address,
            phoneNumber
        }: {
            name: string,
            address: string;
            phoneNumber: number;
        } = req.body;

        const { error } = createBranchValidator.validate(req.body, { abortEarly: false });
        
        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Validation failed.", details: error.details.map(d => d.message)});
        }       

        const branchData: {
            name: string;
            address: string;
            phoneNumber: number;
        } = {
            name: name,
            address: address,
            phoneNumber: phoneNumber
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
 * @param res - Express response object.
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
 * @param res - Express response object.
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
 * @param res - Express response object.
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