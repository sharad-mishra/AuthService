const { User } = require('../models/index');

class UserRepository {
    async create(data){
        try{
            const user = await User.create(data);
            return user;
        }catch(error){
            console.error("Something went wrong in the repository layer ...");
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
}

module.exports = UserRepository ;