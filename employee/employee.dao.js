import UserSchema from '../user/user.model.js'
import EmployeeModel from './employee.model.js'
//Extra Data access layer for Employee model
//It contains DAO(i.e Data Access Object) logics
export default class EmployeeDataLayer {
    //Return the all users from User table
    static async getAllEmployees() {
        return await EmployeeModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
    }
    //Return particular user details by id
    static async getEmployeeByID(id) {
        return await EmployeeModel.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
    }
    //Return particular user details by id
    static async getEmployeesByUserID(user_id) {
        return await EmployeeModel.findAll({
            where: { user_id: user_id },
            include: [{
                model: UserSchema, as: 'User',
                attributes: ['id', 'name', 'email']
            }]
        })
    }
}