import express from 'express';
import cors from 'cors';
import { router } from '../routes/user';
import { dbConnection } from '../database/config';
import { authRouter } from '../routes/auth';
import { categoriasRouter } from '../routes/categorias';

interface IPaths {
    auth: string,
    usuarios: string,
    categorias: string
}
export class Server {
    private app;
    private port;
    private paths: IPaths;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias'
        }

        //conectar a DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(
                `Example app listening at http://localhost:${this.port}`
            );
        });
    }

    private async conectarDB() {
        await dbConnection();
    }

    private middlewares() {
        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    private routes() {
        this.app.use(this.paths.usuarios, router);
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.categorias, categoriasRouter);
    }
}
