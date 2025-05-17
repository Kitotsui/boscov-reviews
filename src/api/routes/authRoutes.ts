import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { autenticarJWT } from '../middlewares/auth';

const router = Router();
const authController = new AuthController();

// Rotas públicas
router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));

// Rotas protegidas
router.get('/me', autenticarJWT, authController.me.bind(authController));

export default router; 