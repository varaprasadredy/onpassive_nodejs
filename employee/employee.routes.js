//Import Controllers
import employeeController from './employee.controller.js'
import Auth from '../utility/auth.js'
//Create a Controllers
const employee = new employeeController()
//Export Router
export default function (router) {
    //CRUD Services and Secure Endpoints
    router.post('/api/employee', Auth.authentication, employee.add)
    router.get('/api/employee/:id', Auth.authentication, employee.findById)
    router.get('/api/employee', Auth.authentication, employee.findAll)
    router.put('/api/employee', Auth.authentication, employee.update)
    router.delete('/api/employee/:id', Auth.authentication, employee.delete)
}