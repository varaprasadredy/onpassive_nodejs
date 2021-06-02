import Sequelize from 'sequelize';
import UserSchema from '../user/user.model.js'
import Utility from '../utility/utility.constant.js';
import EmployeeModel from './employee.model.js'
//Extra Data access layer for Employee model
//It contains DAO(i.e Data Access Object) logics
export default class EmployeeDataLayer {
    //Return the all users from User table
    static async getAllEmployees(options) {
        let whereCondition = [];
        //Order
        let order = await Utility.order(options);
        //Pagination
        let page = await Utility.pagination(options);
        //user_id
        if (options.user_id) {
            whereCondition.push({ user_id: options.user_id })
        }
        //
        return await EmployeeModel.findAll({
            where: {
                [Sequelize.Op.and]: whereCondition,
            },
            include: [
                { all: true, nested: false }
            ],
            order: order,
            offset: page.offset,
            limit: page.limit,
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
