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
 *     summary: Retrieve a list of branches
 *     tags: [Branch]
 *     responses:
 *       '200':
 *         description: Branches retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 branches:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       location:
 *                         type: string
 */
branchRouter.get("/branches", getAllBranches);

// GET branches by id
/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Retrieve a branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *     responses:
 *       '200':
 *         description: Branch retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *       '404':
 *         description: Branch not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Branch not found."
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
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Main Branch"
 *               location:
 *                 type: string
 *                 example: "Downtown"
 *     responses:
 *       '201':
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "Invalid input data."
 */
branchRouter.post("/branches", makeBranch);

// PUT existing branches
/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update a branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Branch"
 *               location:
 *                 type: string
 *                 example: "Uptown"
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "Invalid input data."
 *       '404':
 *         description: Branch not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "Branch not found."
 */
branchRouter.put("/branches/:id", updateBranch);

// DELETE existing branches
/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *     responses:
 *       '200':
 *         description: Branch deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Branch deleted successfully."
 *       '404':
 *         description: Branch not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Branch not found."
 */
branchRouter.delete("/branches/:id", deleteBranch);

export default branchRouter;