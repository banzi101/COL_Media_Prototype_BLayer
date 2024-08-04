const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: test
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '401':
 *         description: Unauthorized
 */


router.post('/login',authController.login);

/**
 * @swagger
 * /auth/token:
 *   post:
 *     summary: Refresh access token
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: <refresh_token>
 *     responses:
 *       '200':
 *         description: Successfully refreshed token
 *       '401':
 *         description: Refresh Token is required
 *       '403':
 *         description: Invalid Refresh Token
 */

router.post('/token', authController.refreshToken);

module.exports = router;
