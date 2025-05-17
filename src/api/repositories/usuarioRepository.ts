import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UsuarioRepository {
  async findByEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async create(data: {
    email: string;
    senha: string;
    nome: string;
    dataNascimento: Date;
  }) {
    return prisma.usuario.create({
      data: {
        ...data,
        status: true,
        tipoUsuario: 'comum',
      }
    });
  }
} 