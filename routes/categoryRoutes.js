const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Tag management API
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: all
 *         schema:
 *           type: boolean
 *         description: Number of categories to return
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/", categoryController.getAllTags);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new tag
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The Tag's name
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", categoryController.createTag);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag data
 *       404:
 *         description: Tag not found
 */
router.get("/:id", categoryController.getTagById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The Tag's name
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tag not found
 */
router.put("/:id", categoryController.updateTag);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       404:
 *         description: Tag not found
 */
router.delete("/:id", categoryController.deleteTag);

module.exports = router;
