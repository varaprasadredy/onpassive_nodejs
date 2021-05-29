//Import Modules or Paths
import Sequelize from 'sequelize'
import UserSchema from '../user/user.model.js';
import sequelize from "../utility/rds.sequelize.js"
//Create a Schema
const EmployeeSchema = sequelize.define('Employee', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    job_title: {
        type: Sequelize.STRING,
    },
    department: {
        type: Sequelize.STRING,
    },
    location: {
        type: Sequelize.STRING,
    },
    age: {
        type: Sequelize.INTEGER,
    },
    salary: {
        type: Sequelize.FLOAT,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

EmployeeSchema.belongsTo(UserSchema, { as: 'User', foreignKey: 'user_id' });
//Export user schema
export default EmployeeSchema;