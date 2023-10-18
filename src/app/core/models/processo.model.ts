import { Clientes } from './cliente.model';
import { Motivos } from './motivos.model';
import { Status } from './status.model';
import { Varas } from './varas.model';

export class Processos {
  _id?: string;
  numeroProcesso?: number;
  clientedescricao?: Clientes['nome'];
  varadescricao?: Varas['descricao'];
  statusdescricao?: Status['descricao'];
  motivosdescricao?: Motivos['descricao'];
  processos?: ProcessoInfo;
  status: boolean;

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
