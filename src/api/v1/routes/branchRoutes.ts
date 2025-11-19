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
/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branch]
 *     responses:
 *       '200':
 *         description: List of all branches
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Branch'
 */
branchRouter.get("/branches", getAllBranches);

// GET branches by id
/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Branch'
 *       '404':
 *         description: Branch not found
 */
branchRouter.get("/branches/:id", getBranchById);

// POST new branches
/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/CreateBranch'
 *     responses:
 *       '201':
 *         description: Branch created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Branch'
 *       '400':
 *         description: Invalid input
 */
branchRouter.post("/branches", makeBranch);

// PUT existing branches
/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/UpdateBranch'
 *     responses:
 *       '200':
 *         description: Branch updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Branch'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Branch not found
 */
branchRouter.put("/branches/:id", updateBranch);

// DELETE existing branches
/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Delete branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch deleted
 *       '404':
 *         description: Branch not found
 */
branchRouter.delete("/branches/:id", deleteBranch);

export default branchRouter;