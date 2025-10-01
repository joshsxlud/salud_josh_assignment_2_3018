import express, { Router } from "express";
import {
    getAllBranches,
    makeBranch,
    getBranchById,
    updateBranch,
    deleteBranch
 } from "../../v1/controllers/branchControllers";

const branchRouter: Router = express.Router();

// Get all
branchRouter.get("/branches", getAllBranches);

//get by id
branchRouter.get("/branches/:id", getBranchById);

// create branch
branchRouter.post("/branches", makeBranch);

// update branch
branchRouter.put("/branches/:id", updateBranch);

// delete branch
branchRouter.delete("/branches/:id", deleteBranch);

export default branchRouter;