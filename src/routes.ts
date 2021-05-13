import express from 'express';
import ClienteController from './controllers/clienteController';
import ProdutoController from './controllers/produtoController';

const router = express.Router();
const clienteController = new ClienteController();
const produtoController = new ProdutoController();

router.get('/cliente', clienteController.show);
router.post('/cliente', clienteController.create);
router.put('/cliente', clienteController.update);
router.delete('/cliente', clienteController.delete);


router.get('/produto', produtoController.show);
router.post('/produto', produtoController.create);
router.put('/produto', produtoController.update);
router.delete('/produto', produtoController.delete);

export default router;
