import { Clientes } from "./cliente.model";
import { Motivos } from "./motivos.model";
import { Status } from "./status.model";

export class Agendamento {
    _id?: string;
    dataatendimento?: Date;
    cliente = new Clientes();
    motivo = new Motivos();
    status = new Status();
}
