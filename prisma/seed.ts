import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpar o banco de dados
  await prisma.avaliacao.deleteMany();
  await prisma.generoFilme.deleteMany();
  await prisma.filme.deleteMany();
  await prisma.genero.deleteMany();
  await prisma.usuario.deleteMany();

  // Criar usuários
  const senhaHash = await bcrypt.hash('123456', 10);
  
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: 'João Silva',
      email: 'joao@email.com',
      senha: senhaHash,
      dataNascimento: new Date('1990-01-01'),
      tipoUsuario: 'ADMIN',
      status: true,
      apelido: 'joaosilva'
    }
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: 'Maria Santos',
      email: 'maria@email.com',
      senha: senhaHash,
      dataNascimento: new Date('1992-05-15'),
      tipoUsuario: 'USUARIO',
      status: true,
      apelido: 'mariasantos'
    }
  });

  // Criar gêneros
  const generos = await Promise.all([
    prisma.genero.create({ data: { descricao: 'Ação' } }),
    prisma.genero.create({ data: { descricao: 'Aventura' } }),
    prisma.genero.create({ data: { descricao: 'Comédia' } }),
    prisma.genero.create({ data: { descricao: 'Drama' } }),
    prisma.genero.create({ data: { descricao: 'Ficção Científica' } }),
    prisma.genero.create({ data: { descricao: 'Romance' } }),
    prisma.genero.create({ data: { descricao: 'Terror' } })
  ]);

  // Criar filmes
  const filmes = await Promise.all([
    prisma.filme.create({
      data: {
        nome: 'O Senhor dos Anéis: A Sociedade do Anel',
        diretor: 'Peter Jackson',
        anoLancamento: 2001,
        duracao: 178,
        produtora: 'New Line Cinema',
        classificacao: '12',
        poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
        sinopse: 'Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal.',
        generos: {
          create: [
            { genero: { connect: { id: generos[0].id } } }, // Ação
            { genero: { connect: { id: generos[1].id } } }  // Aventura
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'Mad Max: Estrada da Fúria',
        diretor: 'George Miller',
        anoLancamento: 2015,
        duracao: 120,
        produtora: 'Warner Bros.',
        classificacao: '14',
        poster: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
        sinopse: 'Em um mundo pós-apocalíptico, Max se une a uma misteriosa mulher para fugir de um tirano e seu exército.',
        generos: {
          create: [
            { genero: { connect: { id: generos[0].id } } }, // Ação
            { genero: { connect: { id: generos[1].id } } }  // Aventura
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'Indiana Jones e os Caçadores da Arca Perdida',
        diretor: 'Steven Spielberg',
        anoLancamento: 1981,
        duracao: 115,
        produtora: 'Paramount Pictures',
        classificacao: '12',
        poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vPDnnfUAgLz7yWQVCK4gJAKFy0m.jpg',
        sinopse: 'O arqueólogo Indiana Jones embarca em uma aventura para encontrar a Arca da Aliança antes dos nazistas.',
        generos: {
          create: [
            { genero: { connect: { id: generos[1].id } } } // Aventura
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'Jumanji',
        diretor: 'Joe Johnston',
        anoLancamento: 1995,
        duracao: 104,
        produtora: 'TriStar Pictures',
        classificacao: '10',
        poster: 'https://image.tmdb.org/t/p/w500/vzmL6fP7aPKNKPRTFnZmiUfciyV.jpg',
        sinopse: 'Duas crianças descobrem um jogo mágico que traz perigos do mundo selvagem para a realidade.',
        generos: {
          create: [
            { genero: { connect: { id: generos[1].id } } }, // Aventura
            { genero: { connect: { id: generos[2].id } } }  // Comédia
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'Se Beber, Não Case!',
        diretor: 'Todd Phillips',
        anoLancamento: 2009,
        duracao: 100,
        produtora: 'Warner Bros.',
        classificacao: '16',
        poster: 'https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg',
        sinopse: 'Três amigos acordam sem memória após uma despedida de solteiro em Las Vegas e precisam encontrar o noivo desaparecido.',
        generos: {
          create: [
            { genero: { connect: { id: generos[2].id } } } // Comédia
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'As Branquelas',
        diretor: 'Keenen Ivory Wayans',
        anoLancamento: 2004,
        duracao: 109,
        produtora: 'Columbia Pictures',
        classificacao: '12',
        poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/aJZOcorpgloDLkPP6ED0t9sXjNu.jpg',
        sinopse: 'Dois agentes do FBI se disfarçam de socialites para investigar um sequestro.',
        generos: {
          create: [
            { genero: { connect: { id: generos[2].id } } } // Comédia
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'O Poderoso Chefão',
        diretor: 'Francis Ford Coppola',
        anoLancamento: 1972,
        duracao: 175,
        produtora: 'Paramount Pictures',
        classificacao: '14',
        poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        sinopse: 'Uma família mafiosa luta para estabelecer sua supremacia nos Estados Unidos depois da Segunda Guerra Mundial.',
        generos: {
          create: [
            { genero: { connect: { id: generos[3].id } } }  // Drama
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'À Espera de um Milagre',
        diretor: 'Frank Darabont',
        anoLancamento: 1999,
        duracao: 189,
        produtora: 'Castle Rock Entertainment',
        classificacao: '14',
        poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/14hEqW67IiHlKpzKMLUXyktzZIV.jpg',
        sinopse: 'Um carcereiro desenvolve uma relação especial com um prisioneiro condenado à morte que possui um dom sobrenatural.',
        generos: {
          create: [
            { genero: { connect: { id: generos[3].id } } } // Drama
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'Interestelar',
        diretor: 'Christopher Nolan',
        anoLancamento: 2014,
        duracao: 169,
        produtora: 'Warner Bros.',
        classificacao: '10',
        poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        sinopse: 'As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial.',
        generos: {
          create: [
            { genero: { connect: { id: generos[4].id } } }, // Ficção Científica
            { genero: { connect: { id: generos[3].id } } }  // Drama
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'Blade Runner 2049',
        diretor: 'Denis Villeneuve',
        anoLancamento: 2017,
        duracao: 164,
        produtora: 'Columbia Pictures',
        classificacao: '16',
        poster: 'https://image.tmdb.org/t/p/w500/aMpyrCizvSdc0UIMblJ1srVgAEF.jpg',
        sinopse: 'Um novo blade runner desenterra um segredo há muito enterrado que pode mergulhar o que resta da sociedade no caos.',
        generos: {
          create: [
            { genero: { connect: { id: generos[4].id } } } // Ficção Científica
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'Orgulho e Preconceito',
        diretor: 'Joe Wright',
        anoLancamento: 2005,
        duracao: 129,
        produtora: 'Focus Features',
        classificacao: '12',
        poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/dmnY0Zs8uMSHkMiol7M3xOlvvkK.jpg',
        sinopse: 'Elizabeth Bennet enfrenta pressões sociais e familiares enquanto lida com o orgulhoso Sr. Darcy.',
        generos: {
          create: [
            { genero: { connect: { id: generos[5].id } } } // Romance
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'La La Land: Cantando Estações',
        diretor: 'Damien Chazelle',
        anoLancamento: 2016,
        duracao: 128,
        produtora: 'Summit Entertainment',
        classificacao: '12',
        poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
        sinopse: 'Uma aspirante a atriz e um músico de jazz se apaixonam em Los Angeles, mas enfrentam desafios para conciliar amor e carreira.',
        generos: {
          create: [
            { genero: { connect: { id: generos[5].id } } } // Romance
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'Invocação do Mal',
        diretor: 'James Wan',
        anoLancamento: 2013,
        duracao: 112,
        produtora: 'New Line Cinema',
        classificacao: '16',
        poster: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
        sinopse: 'Investigadores paranormais ajudam uma família aterrorizada por uma presença sombria em sua fazenda.',
        generos: {
          create: [
            { genero: { connect: { id: generos[6].id } } } // Terror
          ]
        }
      }
    }),
    prisma.filme.create({
      data: {
        nome: 'O Iluminado',
        diretor: 'Stanley Kubrick',
        anoLancamento: 1980,
        duracao: 146,
        produtora: 'Warner Bros.',
        classificacao: '16',
        poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7ceEaLciLfksJkSHqp0vLE5eLyy.jpg',
        sinopse: 'Um homem aceita ser zelador de um hotel isolado e começa a enlouquecer devido a forças sobrenaturais.',
        generos: {
          create: [
            { genero: { connect: { id: generos[6].id } } } // Terror
          ]
        }
      }
    })
  ]);

  // Criar algumas avaliações
  await Promise.all([
    prisma.avaliacao.create({
      data: {
        nota: 5,
        comentario: 'Um dos melhores filmes que já vi!',
        usuario: { connect: { id: usuario1.id } },
        filme: { connect: { id: filmes[0].id } }
      }
    }),
    prisma.avaliacao.create({
      data: {
        nota: 4,
        comentario: 'Muito bom, mas um pouco longo.',
        usuario: { connect: { id: usuario2.id } },
        filme: { connect: { id: filmes[1].id } }
      }
    }),
    prisma.avaliacao.create({
      data: {
        nota: 5,
        comentario: 'Uma obra-prima do cinema!',
        usuario: { connect: { id: usuario1.id } },
        filme: { connect: { id: filmes[2].id } }
      }
    })
  ]);

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 