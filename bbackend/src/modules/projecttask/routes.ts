import { Router } from 'express'
import { projectController } from './controller'

const router = Router()

router.get('/:id', projectController.getProject)
router.get('/', projectController.getAllProjects)
router.get('/task/search', projectController.searchTask)
router.put('/:id', projectController.editProject)
router.put('/task/:id', projectController.editTaskInProject)
router.delete('/task/:id', projectController.deleteTaskFromProject)
router.post('/:id/task', projectController.addTaskToProject)
router.put('/task/:id/assign', projectController.assignedMembersToTask)
router.put(
  '/task/:id/unassign',
  projectController.deleteAssignedMembersFromTask,
)
router.post('/:id/addteam', projectController.addTeamMembers)
router.post('/', projectController.createProject)

export const projectRoutes = router
