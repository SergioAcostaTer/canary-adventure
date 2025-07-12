import { Router } from 'express'

import { placeController } from '@/controllers/placeController'
import { placeImageController } from '@/controllers/placeImageController'

export const places = (router: Router): void => {
  /**
   * @openapi
   * /places/slug/{slug}:
   *   get:
   *     summary: Obtener un lugar por slug
   *     tags:
   *       - Places
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema:
   *           type: string
   *       - in: header
   *         name: Accept-Language
   *         schema:
   *           type: string
   *           example: en
   *     responses:
   *       200:
   *         description: Lugar encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PlaceWithTranslation'
   *       404:
   *         description: Lugar no encontrado
   */
  router.get('/places/slug/:slug', placeController.getBySlug)

  /**
   * @openapi
   * /places/search:
   *   get:
   *     summary: Buscar lugares por nombre, tags o emociones
   *     tags:
   *       - Places
   *     parameters:
   *       - in: query
   *         name: q
   *         schema:
   *           type: string
   *         description: Texto de búsqueda (nombre, tags, etc.)
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *       - in: header
   *         name: Accept-Language
   *         schema:
   *           type: string
   *           example: es
   *     responses:
   *       200:
   *         description: Lista de lugares encontrados
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 results:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/PlaceWithTranslation'
   *                 pagination:
   *                   type: object
   *                   properties:
   *                     page:
   *                       type: integer
   *                     limit:
   *                       type: integer
   *                     total:
   *                       type: integer
   */
  router.get('/places/search', placeController.search)

  /**
   * @openapi
   * /places/featured:
   *   get:
   *     summary: Obtener lugares destacados
   *     tags:
   *       - Places
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *       - in: header
   *         name: Accept-Language
   *         schema:
   *           type: string
   *           example: en
   *     responses:
   *       200:
   *         description: Lista de lugares destacados
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/PlaceWithTranslation'
   */
  router.get('/places/featured', placeController.featured)

  /**
   * @openapi
   * /places/{id}:
   *   get:
   *     summary: Obtener un lugar por ID
   *     tags:
   *       - Places
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *       - in: header
   *         name: Accept-Language
   *         schema:
   *           type: string
   *           example: es
   *     responses:
   *       200:
   *         description: Lugar encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PlaceWithTranslation'
   *       404:
   *         description: Lugar no encontrado
   */
  router.get('/places/:id', placeController.getById)

  /**
   * @openapi
   * /places/{slug}/images:
   *   post:
   *     summary: Añadir imágenes desde URLs a un lugar
   *     tags:
   *       - Places
   *     parameters:
   *       - name: placeId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - imageUrls
   *             properties:
   *               imageUrls:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: Lista de URLs de imágenes
   *     responses:
   *       200:
   *         description: Imágenes añadidas
   *       400:
   *         description: Datos inválidos
   *       404:
   *         description: Lugar no encontrado
   *       500:
   *         description: Error interno
   */
  router.post('/places/:slug/images', placeImageController.addImagesToPlace)
}
