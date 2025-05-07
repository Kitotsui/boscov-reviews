import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

app.use(express.json());

// Swagger setup (swagger.json precisa ser criado)
const swaggerPath = path.join(__dirname, '../swagger.json');
if (fs.existsSync(swaggerPath)) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.warn('swagger.json não encontrado. Documentação Swagger não disponível.');
}

// Exemplo de validação com Zod
type UsuarioInput = {
  email: string;
  senha: string;
};
const usuarioSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
});

// Rota de login (gera JWT)
app.post('/login', async (req: Request, res: Response) => {
  const parse = usuarioSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.errors });
  }
  const { email, senha } = req.body as UsuarioInput;
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario || usuario.senha !== senha) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ userId: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware de autenticação JWT
function autenticarJWT(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

// Rota protegida de exemplo
app.get('/me', autenticarJWT, async (req: Request & { user?: any }, res: Response) => {
  const usuario = await prisma.usuario.findUnique({ where: { id: req.user.userId } });
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json({ usuario });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
}); 