const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const db = require('./models/index');
const {User,Role} = require('./models/index');

const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api',apiRoutes);
    app.listen(PORT, async() => {
        console.log(`Server is running on PORT ${PORT}.`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }
        const u1= await User.findByPk(4);
        const r1= await Role.findByPk(2);
        u1.addRole(r1);
        // const service = new UserService();
        // const token = service.createToken({email : 'sharad.email.com',id:1});
        // // console.log(token);
        // const user = service.verifyToken(token);
        // console.log(user);
    });
}

prepareAndStartServer();