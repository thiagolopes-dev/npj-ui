import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Motivos } from 'src/app/core/models/motivos.model';
import { environment } from 'src/environment/environment';

import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class MotivosService {
  motivoURL: string = '';

  constructor(private http: HttpClient) {
    this.motivoURL = `${environment.apiURL}/motivos`;
  }

  listarMotivos(): Promise<Motivos> {
    return firstValueFrom(this.http.get(`${this.motivoURL}`)).then(
      (response) => response as Motivos,
    );
  }

  adicionarMotivo(obj: Motivos): Promise<Motivos> {
    return firstValueFrom(this.http.post<Motivos>(this.motivoURL, obj));
  }

  atualizarMotivos(obj: Motivos): Promise<Motivos> {
    return firstValueFrom(
      this.http.put<Motivos>(`${this.motivoURL}/${obj._id}`, obj),
    ).then((response) => response as Motivos);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.motivoURL}/${id}`)).then(
      (response) => response as Motivos,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.motivoURL}/${id}`)).then(
      () => null,
    );
  }

  converteStringParaDatas(obj: any) {
    obj.forEach((element: any) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    });
  }
}
