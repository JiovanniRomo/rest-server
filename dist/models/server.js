"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }
    middlewares() {
        this.app.use(express_1.default.static('public'));
    }
    routes() {
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
exports.Server = Server;
//# sourceMappingURL=server.js.map