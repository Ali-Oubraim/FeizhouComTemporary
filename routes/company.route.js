const express = require("express");
const router = express.Router();
const { register } = require("../controllers/company.controller");
const { companyValidationRules } = require("../middlewares/validate");
const auth = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /company:
 *  get:
 *    summary: This Api is Working Properly
 *    description: This Api is Working Properly,
 *    responses:
 *      200:
 *          description: To test Get method
 */

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Company REST API Application",
  });
});

/**
 * @swagger
 * /company/register:
 *   post:
 *     summary: Register a new company
 *     description: Registers a new company with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               industry:
 *                 type: string
 *               companySize:
 *                 type: string
 *               personName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               positionInCompany:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               brandLogo:
 *                 type: string
 *               brandDesc:
 *                 type: string
 *               websiteURL:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", companyValidationRules(), register);

/**
 * @swagger
 * /company/profile:
 *   get:
 *     summary: Get the profile of the authenticated company
 *     description: Retrieve the profile information of the company authenticated by JWT.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company profile retrieved successfully
 *       401:
 *         description: Unauthorized, JWT token is missing or invalid
 *       404:
 *         description: Company not found
 */
router.get("/profile", auth, (req, res) => {
  res.status(200).json({
    message: "Welcome to Company Profile",
  });
});

module.exports = router;
