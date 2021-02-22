import { Router } from 'express';
import { createTodo, getTodos, getTodo, updateTodo, deleteTodo, exportTodos } from '../controllers/todos';
import { authenticate } from '../middleware/auth';
import { findUserTodo } from '../middleware/check';
import { validate } from '../middleware/validation';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *   schemas:
 *     TodoCreate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Task title.
 *           example: Study
 *         description:
 *           type: string
 *           description: Task description.
 *           example: Learn about functional programming
 *         priority:
 *           type: string
 *           description: Task priority, must be one of (HIGH, MEDIUM, LOW).
 *           example: MEDIUM
 *     NewTodo:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The Task ID.
 *               example: 1
 *             todoistId:
 *               type: integer
 *               description: The Task owner ID.
 *               example: 1
 *             todoistName:
 *               type: string
 *               description: The task owner name
 *               example: Charles Rudahigwa
 *         - $ref: '#/components/schemas/TodoCreate'
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           description: A response status code
 *           example: 200
 *         message:
 *           type: string
 *           description: A response  error message
 *           example: Success message
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           description: A response status code
 *           example: 401
 *         error:
 *           type: string
 *           description: A response  error message
 *           example: Error message
 *        
*/

const router = Router();


router.get('/',
  authenticate,
  (req, res, next) => validate(res, req.query?.s, 'todoSearch', next),
  getTodos);


router.get('/export',
  authenticate,
  (req, res, next) => validate(res, req.query?.s, 'todoSearch', next),
  exportTodos);


router.post('/',
  authenticate,
  (req, res, next) => validate(res, req.body, 'todo', next),
  createTodo);


router.get('/:todoId',
  authenticate,
  (req, res, next) => validate(res, +req.params.todoId, 'todoId', next),
  getTodo);


router.patch('/:todoId',
  authenticate,
  (req, res, next) => validate(res, +req.params.todoId, 'todoId', next),
  (req, res, next) => validate(res, req.body, 'todoUpdate', next),
  findUserTodo,
  updateTodo);


router.delete('/:todoId',
  authenticate,
  (req, res, next) => validate(res, +req.params.todoId, 'todoId', next),
  findUserTodo,
  deleteTodo);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: Get all tasks
 *     parameters:
 *     - in: query
 *       name: s
 *       description: Search query
 *       schema:
 *         type: string
 *         description: A search keyword
 *         example: foo
 *     responses:
 *       200:
 *         description: List of Tasks
 *         content:
 *           application/json:
 *             schema:
 *                allOf:
 *                  - $ref: '#/components/schemas/SuccessResponse'
 *                  - type: object
 *                    properties:
 *                      data:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/NewTodo'
 *               
 *       401:
 *         description: Unauthenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *                 
*/

/**
 * @swagger
 * /api/todos/export:
 *   get:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: Export tasks to csv
 *     parameters:
 *     - in: query
 *       name: s
 *       description: Search query
 *       schema:
 *         type: string
 *         description: A search keyword
 *         example: foo
 *     responses:
 *       200:
 *         description: Success
 *               
 *       401:
 *         description: Unauthenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *                 
*/

/**
 * @swagger
 * /api/todos:
 *   post:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: Create a task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoCreate'
 *     responses:
 *       201:
 *         description: A created task
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/NewTodo'
 *               
 *       401:
 *         description: Unauthenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Wrong request data entries
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *                 
 *  */

/**
 * @swagger
 * /api/todos/{todoId}:
 *   get:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: Get a single task
 *     parameters:
 *     - in: path
 *       name: todoId
 *       required: true
 *       description: Id of the requested task.
 *       schema:
 *         type: integer
 *         description: Id of the requested task.
 *         example: 5
 *     responses:
 *       200:
 *         description: Single task
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/NewTodo'
 *               
 *       401:
 *         description: Unauthenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *                 
*/

/**
* @swagger
* /api/todos/{todoId}:
*   patch:
*     tags:
*        - Todos
*     security:
*        - bearerAuth: []
*     summary: Update a task
*     parameters:
*     - in: path
*       name: todoId
*       required: true
*       description: Id of the task to update.
*       schema:
*         type: integer
*         description: Id of the task to update.
*         example: 5
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TodoCreate'
*     responses:
*       201:
*         description: An updated task
*         content:
*           application/json:
*             schema:
*               allOf:
*                 - $ref: '#/components/schemas/SuccessResponse'
*                 - type: object
*                   properties:
*                     data:
*                       $ref: '#/components/schemas/NewTodo'
*               
*       401:
*         description: Unauthenticated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*       404:
*         description: Task not found
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*                 
*  */

/**
* @swagger
* /api/todos/{todoId}:
*   delete:
*     tags:
*       - Todos
*     security:
*       - bearerAuth: []
*     summary: Delete a task
*     parameters:
*     - in: path
*       name: todoId
*       required: true
*       description: Id of the task to delete.
*       schema:
*         type: integer
*         description: Id of the task to delete.
*         example: 5
*     responses:
*       200:
*         description: Success message and status
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/SuccessResponse'
*               
*       401:
*         description: Unauthenticated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*       404:
*         description: Task not found
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*                 
*/

export default router;
