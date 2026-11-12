import express from 'express'
import { createItem, getItems, getMyItems, getItem, updateItem, deleteItem, markReturned } from '../controllers/itemController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router()

router.get('/', getItems)
router.get('/mine', authMiddleware, getMyItems)
router.get('/:id', getItem)
router.post('/', authMiddleware, createItem)
router.put('/:id', authMiddleware, updateItem)
router.delete('/:id', authMiddleware, deleteItem)
router.patch('/:id/returned', authMiddleware, markReturned)

export default router
