import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GeneroController {
  async listarTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const generos = await prisma.genero.findMany();
      res.json(generos);
    } catch (error) {
      next(error);
    }
  }
} 