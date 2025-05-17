import { Request, Response, NextFunction } from 'express';
import { FilmeRepository } from '../repositories/filmeRepository';

const filmeRepository = new FilmeRepository();

export class FilmeController {
  async listarTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filmes = await filmeRepository.findAll();
      res.json(filmes);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const filme = await filmeRepository.findById(Number(id));
      if (!filme) {
        res.status(404).json({ error: 'Filme não encontrado' });
        return;
      }
      res.json(filme);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorGenero(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { generoId } = req.params;
      const filmes = await filmeRepository.findByGenero(Number(generoId));
      res.json(filmes);
    } catch (error) {
      next(error);
    }
  }

  async criar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filme = await filmeRepository.create(req.body);
      res.status(201).json(filme);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const filme = await filmeRepository.update(Number(id), req.body);
      res.json(filme);
    } catch (error) {
      next(error);
    }
  }

  async deletar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await filmeRepository.delete(Number(id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
} 