const express = require("express");
const router = express.Router();
const socialMediaController = require("../controllers/socialMediaController");

/**
 * @swagger
 * tags:
 *   name: Social Media
 *   description: Tag management API
 */

/**
 * @swagger
 * /social-media:
 *   get:
 *     summary: Get all social-media
 *     tags: [Social Media]
 *     parameters:
 *       - in: query
 *         name: all
 *         schema:
 *           type: boolean
 *         description: Number of social-media to return
 *     responses:
 *       200:
 *         description: List of social-media
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/", socialMediaController.getAllTags);

/**
 * @swagger
 * /social-media:
 *   post:
 *     summary: Create a new tag
 *     tags: [Social Media]
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
router.post("/", socialMediaController.createTag);

/**
 * @swagger
 * /social-media/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     tags: [Social Media]
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
router.get("/:id", socialMediaController.getTagById);

/**
 * @swagger
 * /social-media/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     tags: [Social Media]
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
router.put("/:id", socialMediaController.updateTag);

/**
 * @swagger
 * /social-media/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Social Media]
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
router.delete("/:id", socialMediaController.deleteTag);

module.exports = router;
