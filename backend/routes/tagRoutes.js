const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");



/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the tag
 *         name:
 *           type: string
 *           description: The name of the tag
 *         isActivate:
 *           type: boolean
 *           description: The activation status of the tag
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: Technology
 *         isActivate: true
 */

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Tag management API
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     parameters:
 *       - in: query
 *         name: all
 *         schema:
 *           type: boolean
 *         description: Number of tags to return
 *     responses:
 *       200:
 *         description: List of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/", tagController.getAllTags);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
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
router.post("/", tagController.createTag);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     tags: [Tags]
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
router.get("/:id", tagController.getTagById);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     tags: [Tags]
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
router.put("/:id", tagController.updateTag);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Tags]
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
router.delete("/:id", tagController.deleteTag);

module.exports = router;
