import { Request, Response, NextFunction } from 'express';
import { AvaliacaoRepository } from '../repositories/avaliacaoRepository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const avaliacaoRepository = new AvaliacaoRepository();

export class AvaliacaoController {
  async criar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log('Recebendo requisição para criar avaliação:', {
        params: req.params,
        body: req.body
      });

      const { id } = req.params;
      const { nota, comentario, usuarioId } = req.body;

      // Validar dados
      if (!nota || nota < 1 || nota > 5) {
        res.status(400).json({ error: 'Nota inválida. Deve ser entre 1 e 5.' });
        return;
      }

      if (!comentario || comentario.trim().length === 0) {
        res.status(400).json({ error: 'Comentário é obrigatório.' });
        return;
      }

      if (!usuarioId) {
        res.status(400).json({ error: 'ID do usuário é obrigatório.' });
        return;
      }

      console.log('Criando avaliação com dados:', {
        nota,
        comentario,
        usuarioId,
        filmeId: Number(id)
      });

      const avaliacao = await avaliacaoRepository.criar({
        nota,
        comentario,
        usuarioId: Number(usuarioId),
        filmeId: Number(id)
      });

      console.log('Avaliação criada com sucesso:', avaliacao);
      res.status(201).json(avaliacao);
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          res.status(400).json({ error: 'Você já avaliou este filme.' });
          return;
        }
        if (error.code === 'P2003') {
          res.status(400).json({ error: 'Usuário ou filme não encontrado.' });
          return;
        }
      }
      
      res.status(500).json({ error: 'Erro interno ao criar avaliação.' });
    }
  }

  async listarPorFilme(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { filmeId } = req.params;
      console.log('Listando avaliações para o filme:', filmeId);
      
      const avaliacoes = await avaliacaoRepository.listarPorFilme(Number(filmeId));
      console.log('Avaliações encontradas:', avaliacoes.length);
      
      res.json(avaliacoes);
    } catch (error) {
      console.error('Erro ao listar avaliações:', error);
      res.status(500).json({ error: 'Erro interno ao listar avaliações.' });
    }
  }

  async deletar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      console.log('Deletando avaliação:', id);
      
      await avaliacaoRepository.deletar(Number(id));
      console.log('Avaliação deletada com sucesso');
      
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar avaliação:', error);
      res.status(500).json({ error: 'Erro interno ao deletar avaliação.' });
    }
  }
} 