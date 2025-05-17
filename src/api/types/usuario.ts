export interface UsuarioInput {
  email: string;
  senha: string;
  nome: string;
  dataNascimento: string;
}

export interface UsuarioLoginInput {
  email: string;
  senha: string;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  status: boolean;
  dataNascimento: Date;
  tipoUsuario: string;
} 