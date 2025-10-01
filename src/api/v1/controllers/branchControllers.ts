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