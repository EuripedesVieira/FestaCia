"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var clienteController_1 = __importDefault(require("./controllers/clienteController"));
var produtoController_1 = __importDefault(require("./controllers/produtoController"));
var router = express_1.default.Router();
var clienteController = new clienteController_1.default();
var produtoController = new produtoController_1.default();
router.get('/cliente', clienteController.show);
router.post('/cliente', clienteController.create);
router.put('/cliente', clienteController.update);
router.delete('/cliente', clienteController.delete);
router.get('/produto', produtoController.show);
router.post('/produto', produtoController.create);
router.put('/produto', produtoController.update);
router.delete('/produto', produtoController.delete);
exports.default = router;
