import express from 'express'
import userRoutes from './user.js'
import taskRoutes from './task.js'

const router = express.Router()

router.use('/user',userRoutes)
router.use('/task',taskRoutes)

 export default router