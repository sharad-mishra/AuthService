const jwt= require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);    
            return user;
        }catch(error){
            console.log("Something went wrong in the service layer ...");
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try{
            const user = await this.userRepository.getByEmail(email);
            if(!user){
                throw {error : "User not found"};
            }
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch){
                throw {error : "Incorrect password"};
            }
            const newJWT = this.createToken({email : user.email, id: user.id});
            return newJWT;
        }catch(error){
            console.log("Something went wrong in the service layer ...");
            throw error;
        }
    }

    createToken(user){
        try{
            const token = jwt.sign({user}, JWT_KEY, {expiresIn: '1h'});
            return token;
        }catch(error){
            console.log("Something went wrong in the service layer ...");
            throw error;
        }
    }
    verifyToken(token){
        try{
            const user = jwt.verify(token, JWT_KEY);
            return user;
        }catch(error){
            console.log("Something went wrong in the service layer ...");
            throw error;
        }
    }



    checkPassword(userInputPlainPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        }catch(error){
            console.log("Something went wrong in the service layer ...");
            throw error;
        }
    }
}

module.exports = UserService;