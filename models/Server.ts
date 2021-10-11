import express from "express";
import cors from 'cors';
import { router } from '../routes/user.routes';

export class Server {
    private app;
    private port;
    private usuariosPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Middlewares 
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }

    private middlewares() {

        //CORS
        this.app.use( cors() );

        // Directorio publico
        this.app.use(express.static('public'))
    }

    private routes() {
        this.app.use(this.usuariosPath, router)
    }
}
