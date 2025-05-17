import { Router, RequestHandler } from 'express';
import { GeneroController } from '../controllers/generoController';

const router = Router();
const generoController = new GeneroController();

// Rotas públicas
router.get('/', generoController.listarTodos.bind(generoController) as RequestHandler);

export default router; 