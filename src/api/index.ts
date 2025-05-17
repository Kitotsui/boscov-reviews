import express from 'express';
import cors from 'cors';
import filmeRoutes from './routes/filmeRoutes';
import generoRoutes from './routes/generoRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rotas
app.use('/filmes', filmeRoutes);
app.use('/generos', generoRoutes);
app.use('/auth', authRoutes);

// Rota de teste
app.get('/test', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Rotas registradas:');
  console.log('- GET /filmes');
  console.log('- GET /filmes/:id');
  console.log('- POST /filmes/:id/avaliacoes');
  console.log('- GET /filmes/:id/avaliacoes');
}); 