import { Router } from 'express'
import { projectRoutes } from '../modules/projecttask/routes'

const router = Router()

const modulesRoutes = [
  {
    path: '/project',
    router: projectRoutes,
  },
]
modulesRoutes.forEach((route) => router.use(route.path, route.router))

export default router
