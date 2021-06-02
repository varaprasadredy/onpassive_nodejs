//Import Models
import EmployeeModel from './employee.model.js'
import httpStatus from 'http-status-codes'
import EmployeeDataLayer from './employee.dao.js';
//Create a Class
export default class Employee {
    //CRUD endpoints
    async add(request, response) {
        try {
            //Create employee
            let employeeDetails = await EmployeeModel.create(request.body)
            if (employeeDetails) {
                return response.status(httpStatus.OK).send({ status: true, message: "Employee registered successfully" })
            }
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: "employee not registered" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }

    async findById(request, response) {
        try {
            let employeeDetails = await EmployeeDataLayer.getEmployeeByID(request.params.id)
            if (employeeDetails) {
                return response.status(httpStatus.OK).send({ status: true, data: employeeDetails })
            }
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: "Provide valid employee id" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }

    async findAll(request, response) {
        try {
            let employees = await EmployeeDataLayer.getAllEmployees({
                user_id: request.query.user_id,
                order: request.query.order,
                page: request.query.page,
                limit: request.query.limit
            })
            //Return the response
            return response.status(httpStatus.OK).send({ status: true, data: employees })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }

    async update(request, response) {
        try {
            //First Find 
            let employeeDetails = await EmployeeDataLayer.getEmployeeByID(request.body.id)
            if (employeeDetails) {
                await EmployeeModel.update(request.body, { where: { id: request.body.id } })
                //Return the response
                return response.status(httpStatus.OK).send({ status: true, message: "Updated Successfully!" })
            }
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: "Provide valid user id" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }

    async delete(request, response) {
        try {
            //First Find 
            let employeeDetails = await EmployeeDataLayer.getEmployeeByID(request.body.id)
            if (employeeDetails) {
                //Delete
                await EmployeeModel.destroy({ where: { id: request.params.id } })
                return response.status(httpStatus.OK).send({ status: true, message: "Deleted Successfully!" })
            }
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: "Provide valid employee id" })
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
        }
    }
}
