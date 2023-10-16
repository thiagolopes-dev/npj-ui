import { Clientes } from "./cliente.model";
import { Varas } from "./varas.model";


export class Acompanhamentos {
    _id?: string;
    cliente: Clientes["nome"];
    vara: Varas["descricao"];
    numeroProcesso: number;
    data: Date;
    descricao: string;
    status: boolean;
}

