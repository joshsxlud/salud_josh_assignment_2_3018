import express, { Router } from "express";
import {
    getAllBranches,
    makeBranch
 } from "../../v1/controllers/branchControllers";

const branchRouter: Router = express.Router();

// Get all
branchRouter.get("/branches", getAllBranches);

// //get by id
// branchRouter.get("/branches/:id", makeBranch);

// create branch
branchRouter.post("/branches", makeBranch);

// // update branch
// branchRouter.put("/branches/:id",);

// // delete branch
// branchRouter.delete("/branches/:id",);

export default branchRouter;