import { Router, RequestHandler } from 'express';
import { AvaliacaoController } from '../controllers/avaliacaoController';
import { autenticarJWT } from '../middlewares/auth';

const router = Router();
const avaliacaoController = new AvaliacaoController();

// Rotas protegidas
router.post('/:filmeId/avaliacoes', autenticarJWT, avaliacaoController.criar.bind(avaliacaoController) as RequestHandler);
router.get('/:filmeId/avaliacoes', avaliacaoController.listarPorFilme.bind(avaliacaoController) as RequestHandler);
router.delete('/avaliacoes/:id', autenticarJWT, avaliacaoController.deletar.bind(avaliacaoController) as RequestHandler);

// Rota de teste
router.get('/test-avaliacao', (req, res) => {
  res.json({ message: 'Rotas de avaliação funcionando!' });
});

export default router; 