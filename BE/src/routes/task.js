import express from 'express'
import taskController from '../controllers/task.js'
import auth from '../common/auth.js'


const router = express.Router()

router.post('/create',auth.validate,auth.adminGaurd,taskController.createTask)

router.put('/submit/:taskId',auth.validate,taskController.submitTask)
router.get('/taskID/:taskId',auth.validate,taskController.getTaskbyTaskId)
router.get('/user',auth.validate,taskController.getTaskById)
router.get('/tasks/status',auth.validate,taskController.getTasksByStatus)
router.get('/tasks',auth.validate,auth.adminGaurd,taskController.getAllTask)
router.put('/edit/:taskId',auth.validate,auth.adminGaurd,taskController.editTask)
router.delete('/delete/:taskId',auth.validate,auth.adminGaurd,taskController.deleteTask)

export default router