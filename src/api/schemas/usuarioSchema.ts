import { z } from 'zod';

export const usuarioLoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const usuarioCadastroSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  nome: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  dataNascimento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data de nascimento inválida',
  }),
}); 