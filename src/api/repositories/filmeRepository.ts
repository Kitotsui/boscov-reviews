import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FilmeRepository {
  async findAll() {
    return prisma.filme.findMany({
      include: {
        generos: {
          include: {
            genero: true
          }
        },
        avaliacoes: {
          include: {
            usuario: true
          }
        }
      }
    });
  }

  async findById(id: number) {
    return prisma.filme.findUnique({
      where: { id },
      include: {
        generos: {
          include: {
            genero: true
          }
        },
        avaliacoes: {
          include: {
            usuario: true
          }
        }
      }
    });
  }

  async findByGenero(generoId: number) {
    return prisma.filme.findMany({
      where: {
        generos: {
          some: {
            generoId
          }
        }
      },
      include: {
        generos: {
          include: {
            genero: true
          }
        },
        avaliacoes: true
      }
    });
  }

  async create(data: any) {
    return prisma.filme.create({
      data: {
        ...data,
        generos: {
          create: data.generos.map((generoId: number) => ({
            genero: {
              connect: { id: generoId }
            }
          }))
        }
      },
      include: {
        generos: {
          include: {
            genero: true
          }
        },
        avaliacoes: true
      }
    });
  }

  async update(id: number, data: any) {
    // Primeiro, remove todas as relações de gêneros existentes
    await prisma.generoFilme.deleteMany({
      where: { filmeId: id }
    });

    return prisma.filme.update({
      where: { id },
      data: {
        ...data,
        generos: {
          create: data.generos.map((generoId: number) => ({
            genero: {
              connect: { id: generoId }
            }
          }))
        }
      },
      include: {
        generos: {
          include: {
            genero: true
          }
        }
      }
    });
  }

  async delete(id: number) {
    // Primeiro, remove todas as relações de gêneros
    await prisma.generoFilme.deleteMany({
      where: { filmeId: id }
    });

    // Depois, remove o filme
    return prisma.filme.delete({
      where: { id }
    });
  }
} 