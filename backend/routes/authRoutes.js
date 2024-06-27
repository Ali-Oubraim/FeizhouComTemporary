const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require("../middlewares/validate");

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
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *           unique: true
 *           format: email
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *           enum: [admin, owner, developer]
 *           default: admin
 *         position:
 *           type: string
 *           description: The position of the user
 *           default: null
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user
 *           default: null
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: List of permissions assigned to the user
 *         isActive:
 *           type: boolean
 *           description: The activation status of the user
 *           default: true
 *         avatar:
 *           type: string
 *           description: The avatar of the user
 *           default: null
 *       example:
 *         fullName: John Doe
 *         email: john.doe@example.com
 *         password: SamplePassword123
 *         role: admin
 *         position: Developer
 *         phoneNumber: '+1234567890'
 *         permissions:
 *           - read
 *           - write
 *         isActive: true
 *         avatar: http://example.com/avatar.jpg
 */

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
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             fullName: John Doe
 *             email: john.doe@example.com
 *             password: SamplePassword123
 *             role: admin
 *             position: Developer
 *             phoneNumber: '+1234567890'
 *             permissions:
 *               - read
 *               - write
 *     responses:
 *       200:
 *         description: Register successful, returns User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 */
router.post(
  "/register",
  registerValidationRules(),
  validate,
  authController.register
);

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
 *           example:
 *             email: john.doe@example.com
 *             password: SamplePassword123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", loginValidationRules(), validate, authController.login);

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
