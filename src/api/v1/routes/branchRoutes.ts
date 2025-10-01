import express, { Router } from "express";
import { getAllBranches } from "../../v1/controllers/branchControllers";

const branchRouter: Router = express.Router();

// Get all
branchRouter.get("/branches", getAllBranches);

// //get by id
// branchRouter.get("/branches/:id",);

// // create branch
// branchRouter.post("/branches",);

// // update branch
// branchRouter.put("/branches/:id",);

// // delete branch
// branchRouter.delete("/branches/:id",);

export default branchRouter;