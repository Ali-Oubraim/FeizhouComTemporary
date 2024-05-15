const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /auth/login:
 *   post:
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
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.login
);

module.exports = router;
