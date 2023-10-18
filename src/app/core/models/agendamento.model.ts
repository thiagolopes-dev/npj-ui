import { Motivos } from "./motivos.model";
import { Clientes } from "./cliente.model";

export class Agendamento {
    _id?: string;
    dataatendimento?: Date;
    cliente?: Clientes["nome"];
    status?: boolean;
    motivo?: Motivos["descricao"];
}
