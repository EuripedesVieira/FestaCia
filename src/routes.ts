import express from 'express';
import ClienteController from './controllers/clienteController';
import LocacaoController from './controllers/locacaoController';
import ProdutoController from './controllers/produtoController';
import UsuarioController from './controllers/usuarioController';

const router = express.Router();

const clienteController = new ClienteController();
const produtoController = new ProdutoController();
const usuarioController = new UsuarioController();
const locacaoController = new LocacaoController();

router.get('/cliente', clienteController.show);
router.post('/cliente', clienteController.create);
router.put('/cliente', clienteController.update);
router.delete('/cliente', clienteController.delete);
//
router.get('/produto', produtoController.show);
router.post('/produto', produtoController.create);
router.put('/produto', produtoController.update);
router.delete('/produto', produtoController.delete);
//
router.get('/usuario', usuarioController.show);
router.post('/usuario', usuarioController.create);
router.put('/usuario', usuarioController.update);
router.delete('/usuario', usuarioController.delete);
router.post('/login', usuarioController.login);

router.get('/locacao', locacaoController.show);
router.post('/locacao', locacaoController.create);
router.put('/locacao', locacaoController.update);
router.delete('/locacao', locacaoController.delete);
router.patch('/locacao/', locacaoController.updateStatus);
export default router;
