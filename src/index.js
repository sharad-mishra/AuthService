const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api',apiRoutes);
    app.listen(PORT, async() => {
        console.log(`Server is running on PORT ${PORT}.`);
        
        // const service = new UserService();
        // const token = service.createToken({email : 'sharad.email.com',id:1});
        // // console.log(token);
        // const user = service.verifyToken(token);
        // console.log(user);
    });
}

prepareAndStartServer();