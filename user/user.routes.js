//Import Controllers
import Auth from '../utility/auth.js'
import userController from './user.controller.js'
//Create a Controllers
const user = new userController()
//Export Router
export default function (router) {
    //Custom Services
    router.post('/api/user/login', user.userLogin)
    router.post('/api/user/request/resetpassword', Auth.authentication, user.resetPassword)
    router.post('/api/user/updatepassword', Auth.authentication, user.updatePassword)

    //Secure Endpoint
    router.get('/api/user/employees/:id', Auth.authentication, user.employeesByUserID)

    //CRUD Services
    router.post('/api/user', user.userSignUp)
    //Secure Endpoints
    router.get('/api/user/:id', Auth.authentication, user.findUserById)
    router.get('/api/user', Auth.authentication, user.findAll)
    router.put('/api/user', Auth.authentication, user.updateUser)
    router.delete('/api/user/:id', Auth.authentication, user.deleteUser)
}