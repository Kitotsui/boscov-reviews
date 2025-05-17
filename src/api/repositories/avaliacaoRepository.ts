import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AvaliacaoInput {
  nota: number;
  comentario: string;
  usuarioId: number;
  filmeId: number;
}

export class AvaliacaoRepository {
  async criar(data: AvaliacaoInput) {
    try {
      console.log('Tentando criar avaliação com dados:', data);

      // Verificar se o usuário existe
      const usuario = await prisma.usuario.findUnique({
        where: { id: data.usuarioId }
      });

      if (!usuario) {
        console.error('Usuário não encontrado:', data.usuarioId);
        throw new Error('Usuário não encontrado');
      }

      // Verificar se o filme existe
      const filme = await prisma.filme.findUnique({
        where: { id: data.filmeId }
      });

      if (!filme) {
        console.error('Filme não encontrado:', data.filmeId);
        throw new Error('Filme não encontrado');
      }

      // Verificar se o usuário já avaliou este filme
      const avaliacaoExistente = await prisma.avaliacao.findFirst({
        where: {
          usuarioId: data.usuarioId,
          filmeId: data.filmeId
        }
      });

      if (avaliacaoExistente) {
        console.error('Usuário já avaliou este filme:', {
          usuarioId: data.usuarioId,
          filmeId: data.filmeId
        });
        throw new Error('Usuário já avaliou este filme');
      }

      const avaliacao = await prisma.avaliacao.create({
        data,
        include: {
          usuario: {
            select: {
              id: true,
              nome: true
            }
          }
        }
      });

      console.log('Avaliação criada com sucesso:', avaliacao);
      return avaliacao;
    } catch (error) {
      console.error('Erro ao criar avaliação no repositório:', error);
      throw error;
    }
  }

  async listarPorFilme(filmeId: number) {
    try {
      console.log('Listando avaliações para o filme:', filmeId);
      
      const avaliacoes = await prisma.avaliacao.findMany({
        where: {
          filmeId
        },
        include: {
          usuario: {
            select: {
              id: true,
              nome: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      console.log('Avaliações encontradas:', avaliacoes.length);
      return avaliacoes;
    } catch (error) {
      console.error('Erro ao listar avaliações no repositório:', error);
      throw error;
    }
  }

  async deletar(id: number) {
    try {
      console.log('Deletando avaliação:', id);
      
      const avaliacao = await prisma.avaliacao.delete({
        where: {
          id
        }
      });

      console.log('Avaliação deletada com sucesso:', avaliacao);
      return avaliacao;
    } catch (error) {
      console.error('Erro ao deletar avaliação no repositório:', error);
      throw error;
    }
  }
} 