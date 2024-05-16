const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  getAllUsers,
  updateProfile,
  deleteAdmin,
  updatePassword,
} = require("../controllers/adminController");

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       403:
 *         description: Access denied, admin only
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  getAllUsers
);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Update admin information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
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
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user information
 *       403:
 *         description: Access denied, admin only
 */
router.put("/:id", authMiddleware, updateProfile);
/**
 * @swagger
 * /admin/edit-password/{id}:
 *   put:
 *     summary: Update admin Password
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
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
 *         description: Access denied, admin only
 */
router.put(
  "/edit-password/:id",
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
 * /admin/{id}:
 *   delete:
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
 *         description: Access denied, admin only
 */
router.delete("/:id", authMiddleware, roleMiddleware("owner"), deleteAdmin);

module.exports = router;
