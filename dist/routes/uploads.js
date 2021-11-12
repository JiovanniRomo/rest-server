"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsRouter = void 0;
const express_1 = __importDefault(require("express"));
const uploads_1 = require("../controllers/uploads");
exports.uploadsRouter = express_1.default.Router();
exports.uploadsRouter.post('/', uploads_1.cargarArchivo);
//# sourceMappingURL=uploads.js.map