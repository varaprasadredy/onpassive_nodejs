//Import Models
import UserModel from './user.model.js'
import httpStatus from 'http-status-codes'
import jwt from 'jsonwebtoken'
import Utility from '../utility/utility.constant.js'
import UserDataLayer from './user.dao.js';
import EmployeeDataLayer from '../employee/employee.dao.js';
import UserService from './user.client.js';
//Create a Class
export default class User {
    //Custom Endpoints
    async userLogin(request, response) {
        try {
            //First Find 
            let userDetails = await UserDataLayer.getUserByEmail(request.body.email)
            if (userDetails) {
                //Compare password with bycyptjs module
                let validPassword = Utility.validatePassword(request.body.password, userDetails.password)
                if (validPassword) {
                    //Delete password field from userDetails object
                    delete userDetails.password
                    //Prepare JWT payload
                    let payload = {
                        id: userDetails.id,
                        email: userDetails.email,
                    };
                    //Prepare tokens object
                    let tokens = {
                        token: UserDataLayer.createToken(payload),
                        refreshtoken: UserDataLayer.createRefreshToken(payload)
                    };
                    //Return the response
                    return response.status(httpStatus.OK).send({ status: true, data: userDetails, tokens: tokens })
                }
                return response.status(httpStatus.FORBIDDEN).send({ status: false, message: "Enter valid password" })
            }
            return response.status(httpStatus.FORBIDDEN).send({ status: false, message: "Enter valid email" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }
    //CRUD endpoints
    /**
     * @description : This Method is used for store the UserModel details
     */
    async userSignUp(request, response) {
        try {
            //Encrypt the password here..
            request.body.password = await Utility.generateHashPassword(request.body.password);
            //Create User
            let user = await UserDataLayer.getUserByEmail(request.body.email);
            if (user) {
                return response.status(httpStatus.CONFLICT).send({ status: false, message: "Email already exist" })
            }
            //Create User
            let userDetails = await UserModel.create(request.body);
            if (userDetails) {
                return response.status(httpStatus.OK).send({ status: true, message: "User registered successfully" })
            }
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: "User not registered" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }

    //User reset Password  Endpoint.
    async resetPassword(request, response) {
        try {
            let user = await UserDataLayer.getUserByEmail(request.body.email);
            if (user) {
                //Create JWT Token here
                //Prepare JWT payload
                let payload = {
                    id: user.id,
                }
                //Create JWT Token
                let token = UserDataLayer.createToken(payload);
                //Here set Local angular  forgot password URL
                let restUrl = process.env.WEB_DOMAIN + "resetpassword/" + token;
                //Make Email Body Object 
                const mailBody = {
                    to: user.email,
                    from: 'varaprasadreddy.polu@gmail.com',
                    subject: "Reset Password",
                    generateTextFromHTML: true,
                    html: "<a href='" + restUrl + "'>Click link to reset password.</a>"
                };
                //Send email object to user email
                await UserService.sendMail(mailBody);
                return response.status(httpStatus.OK).send({ status: true, message: "Check your mail for password reset link." });
            }
            else {
                response.status(httpStatus.UNPROCESSABLE_ENTITY).send({ status: false, message: "Enter Valid Username." });
            }
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message });
        }
    }

    //This endpoint is used for validate link and password update
    async updatePassword(request, response) {
        try {
            //Token verification
            jwt.verify(request.body.token, process.env.JWT_SECRET, async function (err, decoded) {
                //If err means token not valid
                if (err) {
                    response.status(httpStatus.UNAUTHORIZED).send({ status: false, message: "Unauthorized User." });
                }
                else {
                    //Here encrypt password
                    let password = await Utility.generateHashPassword(request.body.password);
                    let updatedUser = await UserModel.update({ password: password }, { where: { id: decoded.id } });
                    if (updatedUser) {
                        return response.status(httpStatus.OK).send({ status: true, message: "Password updated successfully!" });
                    }
                    else {
                        response.status(httpStatus.UNAUTHORIZED).send({ status: false, message: "Unauthorized User." });
                    }
                }
            })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message });
        }
    }
    /**
     * @description: This method is used for Search by id
     */
    async findUserById(request, response) {
        try {
            let userDetails = await UserDataLayer.getUserByID(request.params.id)
            if (userDetails) {
                return response.status(httpStatus.OK).send({ status: true, data: userDetails })
            }
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: "Provide valid user id" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }
    /**
     * @description: This method is used for find all User data
     */
    async findAll(request, response) {
        try {
            let users = await UserDataLayer.getAllUsers({
                order: request.query.order,
                page: request.query.page,
                limit: request.query.limit
            })
            //Sort the user details by email
            // let sortedUsers = Utility.sortUsersByEmail(users)
            //Return the response
            return response.status(httpStatus.OK).send({ status: true, data: users })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }
    /**
     * @description : This Method is used for Update User data based on Id
     */
    async updateUser(request, response) {
        try {
            //If password is not equal to undefined
            if (request.body.password !== undefined) {
                request.body.password = await Utility.generateHashPassword(request.body.password);
            }
            //First Find 
            let userDetails = await UserDataLayer.getUserByID(request.body.id)
            if (userDetails) {
                await UserModel.update(request.body, { where: { id: request.body.id } })
                //Return the response
                return response.status(httpStatus.OK).send({ status: true, message: "Updated Successfully!" })
            }
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: "Provide valid user id" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }
    /**
     * @description: This method is used for Delete User data based on Id
     */
    async deleteUser(request, response) {
        try {
            //First Find 
            let userDetails = await UserDataLayer.getUserByID(request.body.id)
            if (userDetails) {
                //Delete
                await UserModel.destroy({ where: { id: request.params.id } })
                return response.status(httpStatus.OK).send({ status: true, message: "Deleted Successfully!" })
            }
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: "Provide valid user id" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }
    /**
     * @description: This method is used get the employees by user_id
     */
    async employeesByUserID(request, response) {
        try {
            //First Find 
            let employeeDetails = await EmployeeDataLayer.getEmployeesByUserID(request.params.id)
            return response.status(httpStatus.OK).send({ status: true, data: employeeDetails })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }
}
