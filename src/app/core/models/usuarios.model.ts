
export class Usuarios {
  _id: number;
  name: string;
  username: string;
  password: string;
  cpassword: string;
  status: boolean;
  permissao = new Permissao();
}

export class Permissao {
  motivos: boolean;
  varas: boolean;
  status: boolean;
  clientes: boolean;
  agendamentos: boolean;
  processos: boolean;
  usuarios: boolean;
}