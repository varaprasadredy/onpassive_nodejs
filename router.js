//Import modules or path's
import Router from 'express'
import userRoutes from './user/user.routes.js'
import employeeRoutes from './employee/employee.routes.js'
//Create Router Instance
const router = new Router()
userRoutes(router)
employeeRoutes(router)
//Export router
export default router