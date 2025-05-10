const { User, Role } = require('../models/index');  // Changed import
const ValidationError = require('../utils/validation-error');

class UserRepository {
    async create(data){
        try{
            const user = await User.create(data);
            return user;
        }catch(error){
            if(error.name === 'SequelizeValidationError'){
                throw new ValidationError(error); // Updated to throw ValidationError directly
            }
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async destroy(userId){
        try{
            const user = await User.destroy({
                where: {
                    id: userId
                }
            });
            return user;
        }catch(error){
            console.log("Something went wrong in the repository layer ...");
            throw error;
        }
    }
     async getById(userId){
        try{
            const user = await User.findByPk(userId,{
                attributes : ['id','email']
            });
            return user;

        }catch(error){
            console.log("Something went wrong in the repository layer ...");
            throw error;
        }
     }
     async getByEmail(email){
        try{
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            return user;
        }catch(error){
            console.log("Something went wrong in the repository layer ...");
            throw error;
        }
     }
     async isAdmin(userId){
        try{
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        }catch(error){
            console.log("Something went wrong on repository layer");
            throw error;
        }
     }
}

module.exports = UserRepository;