const jwt= require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppError = require('../utils/error-handler');
const AppErrors = require('../utils/error-handler');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);    
            return user;
        }catch(error){
            if(error.name==='SequelizeValidationError'){
                throw error;

            }
            console.log("Something went wrong in the service layer ...");
            throw new AppError(
                'ServiceError',
                'Soomething went wrong in the service layer ...',
                'Logical error in the service layer ...',
                500
            );
        }
    }

    async signIn(email, plainPassword){
        try{
            //fetch user from DB
            const user = await this.userRepository.getByEmail(email);
            //check if user exists
            if(!user){
                throw {error : "User not found"};
            }
            //compare incoming plain password with encrypted password in DB
            //if password does not match, throw error
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch){
                console.log("Password does not match ...");
                throw {error : "Incorrect password"};
            }
            //create JWT token and send it back to the user
            //if password matches, create JWT token and send it back to the user
            const newJWT = this.createToken({email : user.email, id: user.id});
            return newJWT;
        }catch(error){
            console.log("Something went wrong in the service layer ...");
            throw error;
        }
    }

    createToken(user){
        try{
            const token = jwt.sign({user}, JWT_KEY, {expiresIn: '1d'});
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

    async isAuthenticated(token){
        try{
            const user = this.verifyToken(token);
            if(!user){
                throw {error : "Invalid token"};
            }
            const userFromDB = await this.userRepository.getById(user.id);
            if(!userFromDB){
                throw {error : "No user with the corresponding token exists"};
            }
            return userFromDB.id;
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

    isAdmin(userId){
        try{
            return this.userRepository.isAdmin(userId);
        }catch(error){
            console.log("Something went wrong in the service layer ...");
            throw error;
        }
    }
}

module.exports = UserService;