import express from 'express'
import { createItem, getItems } from '../controllers/itemController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router()

router.get('/', getItems)
router.post('/', authMiddleware, createItem)

export default router
