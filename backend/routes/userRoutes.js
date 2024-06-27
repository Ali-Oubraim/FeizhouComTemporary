const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  getAllUsers,
  updateProfile,
  deleteUser,
  updatePassword,
} = require("../controllers/userController");


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *           enum:
 *             - admin
 *             - owner
 *         isActive:
 *           type: boolean
 *           description: The activation status of the user
 *         avatar:
 *           type: string
 *           description: The avatar of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         fullName: John Doe
 *         email: john.doe@example.com
 *         password: SamplePassword123
 *         role: admin
 *         isActive: true
 *         avatar: http://example.com/avatar.jpg
 *         createdAt: 2022-04-01T10:00:00.000Z
 *         updatedAt: 2022-04-01T10:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       403:
 *         description: Access denied, user only
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  getAllUsers
);

/**
 * @swagger
 * /users:
 *   put:
 *     tags: [Users]
 *     summary: Update user information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user information
 *       403:
 *         description: Access denied, user only
 */
router.put("/", authMiddleware, updateProfile);
/**
 * @swagger
 * /users/edit-password:
 *   put:
 *     tags: [Users]
 *     summary: Update user Password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user information
 *       403:
 *         description: Access denied, user only
 */
router.put(
  "/edit-password",
  [
    check("newPassword")
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters long"),
  ],
  authMiddleware,
  updatePassword
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Successfully deleted user
 *       403:
 *         description: Access denied, owner only
 */
router.delete("/:id", authMiddleware, roleMiddleware("owner"), deleteUser);

module.exports = router;
