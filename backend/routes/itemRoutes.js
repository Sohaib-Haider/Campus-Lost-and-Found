import express from 'express'
import { createItem } from '../controllers/itemController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/', authMiddleware, createItem)

export default router
