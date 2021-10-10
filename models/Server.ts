import express from "express";

export class Server {
    private app;
    private port;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

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
        // Directorio publico
        this.app.use(express.static('public'))
    }

    private routes() {
        this.app.get("/api", (req, res) => {
            res.json({
                msg: 'get API'
            });
        });

        this.app.put("/api", (req, res) => {
            res.json({
                msg: 'put API'
            });
        });

        this.app.post("/api", (req, res) => {
            res.json({
                msg: 'post API'
            });
        });

        this.app.delete("/api", (req, res) => {
            res.json({
                msg: 'delete API'
            });
        });
    }
}
