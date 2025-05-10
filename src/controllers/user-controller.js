const UserService = require('../services/user-service');

const userService= new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch(error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}

const signIn = async (req, res) => {
    try{
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success:true,
            message: 'Successfully signed in',
            data: response,
            err: {}
        });
    }catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}

const isAuthenticated = async (req, res) => {
    try{
        const token = req.headers['x-access-token'];
        const response = await userService.verifyToken(token);
        return res.status(200).json({
            success:true,
            message: 'User is authenticated and token is valid',
            data: response,
            err: {}
        });
    }catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}

const isAdmin = async(req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: 'Successfully fetched whether user is admin or not'
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}