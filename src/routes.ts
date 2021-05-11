import express from 'express';
import ClienteController from './controllers/clienteController';

const router = express.Router();
const clienteController = new ClienteController();

router.get('/cliente', clienteController.show);
router.post('/cliente', clienteController.create);
router.put('/cliente', clienteController.update);
router.delete('/cliente', clienteController.delete);

export default router;
