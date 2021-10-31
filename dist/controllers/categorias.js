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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCategoria = exports.actualizarRegistroPorId = exports.crearCategoria = exports.obtenerCategoriaId = exports.categoriasGet = void 0;
const Categoria = require('../models/categoria');
const categoriasGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { desde = 0, limite = 10 } = req.query;
    try {
        const categorias = yield Categoria.countDocuments({ estado: true });
        const categoriasNombre = yield Categoria.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite));
        res.json({
            msg: 'todo ok',
            totalCategorias: categorias,
            categoriasNombre,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Algo paso, por favor intentalo de nuevo',
        });
    }
});
exports.categoriasGet = categoriasGet;
const obtenerCategoriaId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoriaSeleccionada = yield Categoria.findById(id).populate({
        path: 'usuario',
        select: 'nombre',
    });
    if (!categoriaSeleccionada) {
        return res.status(404).json({
            msg: 'No existe la categoria, intenta con otro ID, por favor',
        });
    }
    if (!categoriaSeleccionada.estado) {
        return res.status(404).json({
            msg: 'La categoria no esta disponible',
        });
    }
    res.json({
        categoriaSeleccionada,
        msg: 'todo ok - get categoria id',
    });
});
exports.obtenerCategoriaId = obtenerCategoriaId;
const crearCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    try {
        const categoriaDB = yield Categoria.findOne({ nombre });
        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe`,
            });
        }
        const data = {
            nombre,
            usuario: req.usuario ? req.usuario._id : null,
        };
        const categoria = new Categoria(data);
        yield categoria.save();
        res.status(200).json(categoria);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Oh no! Algo ha salido muy mal!',
        });
    }
});
exports.crearCategoria = crearCategoria;
const actualizarRegistroPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const nombreActualizado = req.body.nombre.toUpperCase();
    try {
        const categoriaDB = yield Categoria.findById(id);
        if (!(categoriaDB === null || categoriaDB === void 0 ? void 0 : categoriaDB.estado)) {
            return res.status(400).json({
                msg: 'La categoria que intenta actualizar ha sido eliminada.'
            });
        }
        const categoriaActualizada = yield Categoria.findByIdAndUpdate(id, { nombre: nombreActualizado }, { new: true })
            .populate({
            path: 'usuario'
        });
        res.json({
            categoriaActualizada,
            msg: 'todo ok - actualizar registro por id',
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Algo paso! Por favor intentalo de nuevo',
        });
    }
});
exports.actualizarRegistroPorId = actualizarRegistroPorId;
const eliminarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categoriaEliminada = yield Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.json({
            categoriaEliminada,
            msg: 'todo ok - eliminar categoria',
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se que ha salido mal',
        });
    }
});
exports.eliminarCategoria = eliminarCategoria;
//# sourceMappingURL=categorias.js.map