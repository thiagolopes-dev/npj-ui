import { Clientes } from './cliente.model';
import { Motivos } from './motivos.model';
import { Status } from './status.model';
import { Usuarios } from './usuarios.model';
import { Varas } from './varas.model';

export class Processos {
  _id?: string;
  numeroProcesso?: number;
  cliente = new Clientes();
  varas =  new Varas();
  status = new Status();
  motivos = new Motivos();
  itensprocesso?: ItensProcesso;

  constructor() {
    this.itensprocesso = new ItensProcesso();
  }
}

export class ItensProcesso {
  codigo?: string;
  informacoes?: string;
  usuariocriacao= new Usuarios();
  datacriacao?: Date;
}
