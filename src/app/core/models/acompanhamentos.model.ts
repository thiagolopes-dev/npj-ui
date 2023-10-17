import { Clientes } from './cliente.model';
import { Motivos } from './motivos.model';
import { Status } from './status.model';
import { Varas } from './varas.model';

export class Acompanhamentos {
  _id?: string; // ID do acompanhamento
  numeroProcesso?: number; // Número do processo
  clientedescricao?: Clientes['nome']; // Descrição do cliente
  varadescricao?: Varas['descricao']; // Descrição da vara
  statusdescricao?: Status['descricao']; // Descrição do status
  motivosdescricao?: Motivos['descricao']; // Descrição do motivo
  processos?: Processo; // Informações do processo associado
  status: boolean; // Status do acompanhamento

  constructor() {
    this.processos = new Processo(); // Inicializa a instância de Processo
  }
}

export class Processo {
  codigo?: string; // Código do processo
  informacoes?: string; //
  data?: Date;
}
