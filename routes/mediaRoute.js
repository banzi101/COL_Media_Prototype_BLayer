/**
 *@swagger
 * /media/:
 *  post:
 *      tags:
 *          - media
 *      security:
 *          - apiKeyAuth: []
 *          - bearerAuth: []
 *      summary: Creates media
 *      requestBody:
 *          description: Details of media.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fileName:
 *                              type: string
 *                              example: "example.mp4"
 *                          mediaName:
 *                              type: string
 *                              example: "Example Media"
 *                          path:
 *                              type: string
 *                              example: "/media/example.mp4"
 *      responses:
 *          200:
 *              description: A successful response
 *          500:
 *              description: An unsuccessful response
 *  
 *  get:
 *      tags:
 *          - media
 *      security:
 *          - apiKeyAuth: []
 *          - bearerAuth: []
 *      summary: Returns all media
 *      responses:
 *          200:
 *              description: A successful response
 *          500:
 *              description: An unsuccessful response
 *  
 * 
 * /media/{mediaName}:
 *  get:
 *      tags:
 *          - media
 *      security:
 *          - apiKeyAuth: []
 *          - bearerAuth: []
 *      summary: Returns media by name
 *      parameters:
 *         - name: mediaName
 *           in: path
 *           required: true
 *           description: Media Name.
 *           schema:
 *               type : string
 *      responses:
 *          200:
 *              description: A successful response
 *          500:
 *              description: An unsuccessful response
 * 
 * /media/{id}:
 *  get:
 *      tags:
 *          - media
 *      security:
 *          - apiKeyAuth: []
 *          - bearerAuth: []
 *      summary: Returns media by id
 *      parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: id of Media.
 *           schema:
 *               type : string
 *      responses:
 *          200:
 *              description: A successful response
 *          500:
 *              description: An unsuccessful response
 *  put:
 *      tags:
 *          - media
 *      security:
 *          - apiKeyAuth: []
 *          - bearerAuth: []
 *      summary: Updates media by id
 *      parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: id of Media.
 *           schema:
 *               type : integer
 *      requestBody:
 *          description: Details of media.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fileName:
 *                              type: string
 *                              example: "example.mp4"
 *                          mediaName:
 *                              type: string
 *                              example: "Example Media"
 *                          path:
 *                              type: string
 *                              example: "/media/example.mp4"
 *      responses:
 *          200:
 *              description: A successful response
 *          500:
 *              description: An unsuccessful response
 * 
 *  delete:
 *      tags:
 *          - media
 *      security:
 *          - apiKeyAuth: []
 *          - bearerAuth: []
 *      summary: Returns media by id
 *      parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: id of Media.
 *           schema:
 *               type : string
 *      responses:
 *          200:
 *              description: A successful response
 *          500:
 *              description: An unsuccessful response
 *
 *  
 */

const router = require("express").Router();
const mediaController = require("../controllers/mediaController");

router.get("/", mediaController.getAllMedia);
router.get("/:mediaName", mediaController.getByMediaName);
router.get("/:id", mediaController.getMediaById);
router.post("/", mediaController.createMedia);
router.put("/:id", mediaController.updateMedia);
router.delete("/:id", mediaController.deleteMedia);

module.exports = router;