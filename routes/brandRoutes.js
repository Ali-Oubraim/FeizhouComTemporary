const express = require("express");
const { check } = require("express-validator");
const brandController = require("../controllers/brandController");
const {
  updateBrandValidationRules,
  brandValidationRules,
} = require("../middlewares/validate");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - brandName
 *         - brandLogo
 *         - sector
 *         - username
 *         - email
 *         - password
 *         - position_in_brand
 *         - brandSize
 *         - brandType
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the brand
 *         brandName:
 *           type: string
 *           description: The name of the brand
 *         brandLogo:
 *           type: string
 *           description: The logo of the brand
 *         sector:
 *           type: string
 *           description: The sector of the brand
 *         username:
 *           type: string
 *           description: The username of the brand's contact person
 *         email:
 *           type: string
 *           description: The email of the brand's contact person
 *         password:
 *           type: string
 *           description: The password of the brand's contact person
 *         position_in_brand:
 *           type: string
 *           description: The position of the contact person within the brand
 *         brandSize:
 *           type: string
 *           description: The size of the brand
 *           enum:
 *             - small
 *             - medium
 *             - large
 *         brandType:
 *           type: string
 *           description: The type of the brand
 *           enum:
 *             - coparatif
 *             - company
 *             - assiciation
 *       example:
 *         brandName: Sample Brand
 *         brandLogo: http://example.com/logo.png
 *         sector: Technology
 *         username: sampleuser
 *         email: sample@example.com
 *         password: SamplePassword123
 *         position_in_brand: CEO
 *         brandSize: medium
 *         brandType: company
 */

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: The brands managing API
 */

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: The brand was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Some server error
 */

router.post("/", brandValidationRules(), brandController.createBrand);

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Returns the list of all the brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: The list of the brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */

router.get("/", brandController.getBrands);

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get the brand by id
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand id
 *     responses:
 *       200:
 *         description: The brand description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: The brand was not found
 */
router.get("/:id", brandController.getBrandById);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Update the brand by the id
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: The brand was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: The brand was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", updateBrandValidationRules(), brandController.updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Remove the brand by id
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand id
 *     responses:
 *       200:
 *         description: The brand was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: The brand was not found
 */
router.delete("/:id", brandController.deleteBrand);
/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Soft Remove the brand by id
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand id
 *     responses:
 *       200:
 *         description: The brand was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: The brand was not found
 */
router.patch("/:id", brandController.softDeleteBrand);

module.exports = router;
