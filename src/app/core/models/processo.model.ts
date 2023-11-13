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
  processos?: ProcessoInfo;

  constructor() {
    this.processos = new ProcessoInfo();
  }
}

export class ProcessoInfo {
  codigo?: string;
  informacoes?: string;
  usuariocriacao?: string;
  datacriacao?: Date;
}
