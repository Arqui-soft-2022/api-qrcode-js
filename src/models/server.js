require('dotenv').config();

const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = 3001;//process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            code: '/api/code'
        }

        this.middlewares();

        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.code, require('../routes/code.routes'))
        this.app.use('/', require('../routes/index.routes'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server on port${this.port}`);
        })
    }
}

module.exports = Server;