export class Agendamento {
    atendimento?: number;
    numeroprontuario?: number;
    dataatendimento?: Date;
    cliente?: ClienteAgenda;
    status?: StatusAgenda;
    motivo?: MotivoAgenda;
}

export class ClienteAgenda {
    _id?: string;
    nome?: string;
}

export class StatusAgenda {
    codigo?: string;
    descricao?: string;
}

export class MotivoAgenda {
    codigo?: string;
    descricao?: string;
}

