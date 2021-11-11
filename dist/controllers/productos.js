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
exports.actualizarProducto = exports.eliminarProducto = exports.crearProducto = exports.obtenerProductoId = exports.obtenerProductos = void 0;
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const productos = yield Producto.find({ estado: true })
        .populate([
        { path: 'usuario', select: 'nombre' },
        { path: 'categoria', select: 'nombre' },
    ])
        .skip(Number(desde))
        .limit(Number(limite));
    res.json({
        ok: true,
        "total": productos.length,
        productos,
    });
});
exports.obtenerProductos = obtenerProductos;
const obtenerProductoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const productoId = yield Producto.findById(id);
    res.json({
        ok: true,
        producto: productoId,
    });
});
exports.obtenerProductoId = obtenerProductoId;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const nombre = req.body.nombre.toUpperCase();
    let categoria = req.body.categoria;
    categoria = categoria.toUpperCase();
    try {
        let producto = yield Producto.findOne({ nombre });
        const categoriaDB = yield Categoria.findOne({ nombre: categoria });
        if (producto) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El producto ya existe',
            });
        }
        const data = {
            nombre,
            usuario: (_a = req.usuario) === null || _a === void 0 ? void 0 : _a._id,
            categoria: categoriaDB === null || categoriaDB === void 0 ? void 0 : categoriaDB._id,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
        };
        producto = new Producto(data);
        yield producto.save();
        res.json({
            ok: true,
            mensaje: 'Todo esta bien, crear producto!!',
            productoDB: producto,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.crearProducto = crearProducto;
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const producto = yield Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        ok: true,
        msg: `El producto: ${producto === null || producto === void 0 ? void 0 : producto.nombre} ha sido eliminado`,
        productoDB: producto,
    });
});
exports.eliminarProducto = eliminarProducto;
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = req.params.id;
    const nuevoNombre = req.body.nombre ? req.body.nombre.toUpperCase() : '';
    const usuarioActualizando = (_b = req.usuario) === null || _b === void 0 ? void 0 : _b._id;
    const producto = yield Producto.findById(id);
    if (!(producto === null || producto === void 0 ? void 0 : producto.estado)) {
        return res.status(400).json({
            ok: false,
            msg: 'El producto no existe, por favor verifique el producto.',
        });
    }
    const productoActualizado = yield Producto.findByIdAndUpdate(id, {
        nombre: nuevoNombre ? nuevoNombre : producto.nombre,
        descripcion: req.body.descripcion
            ? req.body.descripcion
            : producto.descripcion,
        usuario: usuarioActualizando,
    }, { new: true }).populate([
        { path: 'usuario', select: 'nombre' },
        { path: 'categoria', select: 'nombre' },
    ]);
    res.json({
        ok: true,
        msg: 'El producto ha sido actualizado con exito',
        productoActualizado,
    });
});
exports.actualizarProducto = actualizarProducto;
//# sourceMappingURL=productos.js.map