import { Clientes } from "./cliente.model";
import { Motivos } from "./motivos.model";

export class Agendamento {
    _id?: string;
    dataatendimento?: Date;
    clientes = new Clientes();
    status?: boolean;
    motivos = new Motivos();
}
