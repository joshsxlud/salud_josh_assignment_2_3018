import express, { Router } from "express";
import {
    getAllBranches,
    makeBranch,
    getBranchById,
    updateBranch,
    deleteBranch
 } from "../../v1/controllers/branchControllers";

 // Router handling branch routes
const branchRouter: Router = express.Router();

// GET all branches
branchRouter.get("/branches", getAllBranches);

// GET branches by id
branchRouter.get("/branches/:id", getBranchById);

// POST new branches
branchRouter.post("/branches", makeBranch);

// PUT existing branches
branchRouter.put("/branches/:id", updateBranch);

// DELETE existing branches
branchRouter.delete("/branches/:id", deleteBranch);

export default branchRouter;