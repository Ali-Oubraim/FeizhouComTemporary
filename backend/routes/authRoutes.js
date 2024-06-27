const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  registerValidationRules,
  loginValidationRules,validate
} = require("../middlewares/validate");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operations related to authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Login to the system
 *     description: Authenticate user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *               role:
 *                 type: string
 *                 description: The user's role
 *     responses:
 *       200:
 *         description: Register successful, returns User
 *       400:
 *         description: Invalid credentials
 */
router.post("/register", registerValidationRules(),validate, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login to the system
 *     description: Authenticate user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", loginValidationRules(),validate, authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout from the system
 *     description: Clear the authentication token cookie and log out the user.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Logged out
 *       500:
 *         description: Server error
 */
router.post("/logout", authController.logout);

module.exports = router;
