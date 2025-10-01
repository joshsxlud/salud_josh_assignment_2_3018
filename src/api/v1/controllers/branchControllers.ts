import { NextFunction, Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "src/data/branches";
import { HTTP_STATUS } from "../../constants/httpConstants";

export const getAllBranches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try{
        const branches: Branch[] = await branchService.getAllBranches();
        res.status(HTTP_STATUS.OK).json({message: "Get all branches", data: branches});
        
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Failed to retrieve branches."});
        next(error);
    }

};

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

export const getBranchById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const branch: Branch = await branchService.getBranchById(id);
        res.status(HTTP_STATUS.OK).json({message: "Branch Found", data: branch});
    }
    catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: String(error)});
        next(error);
    }
};

export const updateBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const branchData: Pick<Branch, "address" | "phoneNumber"> = req.body;

        const updatedBranch = await branchService.updateBranch(id, branchData);

        res.status(HTTP_STATUS.OK).json({message: "Branch information updated.", data: updatedBranch});
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: String(error)});
        next(error);
    }
};

export const deleteBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id= parseInt(req.params.id);
        const deletedBranch: Branch = await branchService.deleteBranch(id);

        res.status(HTTP_STATUS.OK).json({message: "Branch Deleted.", data: deletedBranch});
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: String(error)});
        next(error);
    }
};