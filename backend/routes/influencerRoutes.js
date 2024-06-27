const express = require("express");
const { check } = require("express-validator");
const influencerController = require("../controllers/InfluencerController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Influencer:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           description: The first name of the influencer
 *         last_name:
 *           type: string
 *           description: The last name of the influencer
 *         username:
 *           type: string
 *           description: The username of the influencer
 *         email:
 *           type: string
 *           description: The email of the influencer
 *         password:
 *           type: string
 *           description: The password of the influencer
 *         isActivate:
 *           type: boolean
 *           description: The activation status of the influencer
 *         avatar:
 *           type: string
 *           description: The avatar of the influencer
 *         country:
 *           type: string
 *           description: The country of the influencer
 *         city:
 *           type: string
 *           description: The city of the influencer
 *         bio:
 *           type: string
 *           description: The bio of the influencer
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             description: The ID of a tag
 *           description: List of tags associated with the influencer
 *         social_medias:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               socialMediaId:
 *                 type: string
 *                 description: The ID of the social media
 *               url:
 *                 type: string
 *                 description: The URL of the social media profile
 *       example:
 *         first_name: John
 *         last_name: Doe
 *         username: johndoe
 *         email: john.doe@example.com
 *         password: SamplePassword123
 *         isActivate: true
 *         avatar: http://example.com/avatar.jpg
 *         country: USA
 *         city: New York
 *         bio: Influencer bio here
 *         tags:
 *           - 60d0fe4f5311236168a109cc
 *           - 60d0fe4f5311236168a109cd
 *         social_medias:
 *           - socialMediaId: 60d0fe4f5311236168a109cb
 *             url: http://example.com/profile
 */

/**
 * @swagger
 * tags:
 *   name: Influencers
 *   description: The influencers managing API
 */

/**
 * @swagger
 * /influencers:
 *   post:
 *     summary: Create a new influencer
 *     tags: [Influencers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Influencer'
 *     responses:
 *       201:
 *         description: The influencer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Influencer'
 *       500:
 *         description: Some server error
 */
router.post(
  "/",
  [
    check("first_name").not().isEmpty().withMessage("First name is required"),
    check("last_name").not().isEmpty().withMessage("Last name is required"),
    check("username").not().isEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Please include a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  influencerController.createInfluencer
);

/**
 * @swagger
 * /influencers:
 *   get:
 *     summary: Returns the list of all the influencers
 *     tags: [Influencers]
 *     responses:
 *       200:
 *         description: The list of the influencers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Influencer'
 */
router.get("/", influencerController.getInfluencers);

/**
 * @swagger
 * /influencers/{id}:
 *   get:
 *     summary: Get the influencer by id
 *     tags: [Influencers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The influencer id
 *     responses:
 *       200:
 *         description: The influencer description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Influencer'
 *       404:
 *         description: The influencer was not found
 */
router.get("/:id", influencerController.getInfluencerById);

/**
 * @swagger
 * /influencers/{id}:
 *   put:
 *     summary: Update the influencer by the id
 *     tags: [Influencers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The influencer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Influencer'
 *     responses:
 *       200:
 *         description: The influencer was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Influencer'
 *       404:
 *         description: The influencer was not found
 *       500:
 *         description: Some error happened
 */
router.put(
  "/:id",
  [
    check("first_name")
      .optional()
      .not()
      .isEmpty()
      .withMessage("First name is required"),
    check("last_name")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Last name is required"),
    check("username")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Username is required"),
    check("email")
      .optional()
      .isEmail()
      .withMessage("Please include a valid email"),
    check("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  influencerController.updateInfluencer
);

/**
 * @swagger
 * /influencers/{id}:
 *   delete:
 *     summary: Remove the influencer by id
 *     tags: [Influencers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The influencer id
 *     responses:
 *       200:
 *         description: The influencer was deleted
 *       404:
 *         description: The influencer was not found
 */
router.delete("/:id", influencerController.deleteInfluencer);

module.exports = router;
