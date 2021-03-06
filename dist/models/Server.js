"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("../routes/user");
const config_1 = require("../database/config");
const auth_1 = require("../routes/auth");
const categorias_1 = require("../routes/categorias");
const productos_1 = require("../routes/productos");
const busqueda_1 = require("../routes/busqueda");
const uploads_1 = require("../routes/uploads");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            upload: '/api/uploads',
        };
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }
    routes() {
        this.app.use(this.paths.usuarios, user_1.router);
        this.app.use(this.paths.auth, auth_1.authRouter);
        this.app.use(this.paths.categorias, categorias_1.categoriasRouter);
        this.app.use(this.paths.productos, productos_1.productosRouter);
        this.app.use(this.paths.buscar, busqueda_1.busquedasRouter);
        this.app.use(this.paths.upload, uploads_1.uploadsRouter);
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map