import { Clientes } from './cliente.model';
import { Motivos } from './motivos.model';
import { Status } from './status.model';
import { Varas } from './varas.model';

export class Processos {
  _id?: string;
  codigo?: number;
  numeroprocesso?: string;
  cliente = new Clientes();
  vara =  new Varas();
  status = new Status();
  motivo = new Motivos();
  datacriacao?: Date;
 // usuariocriacao= new Usuarios();
  itensprocesso = new Array<ItensProcesso>();
  partes = new Array<Partes>();
  observacao: string;
  aluno: string;

}

export class ItensProcesso {
  codigo?: number;
  informacoes?: string;
  usuariocriacao?: string;
  datacriacao?: Date;
}

export class Partes {
  nome?: string;
  cpf?: string;
  whats?: string;
  telefone?: string;
  email?: string;
  usuariocriacao?: string;
  datacriacao?: Date;
}
