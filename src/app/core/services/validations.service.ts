import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  sinal = true;
  valorTooltip = 'Inativos';

  constructor(private http: HttpClient) { }

  formataSimeNao(Array: any) {
    for (const i of Object.keys(Array)) {
      if (Array[i].status === true) {
        Array[i].statusformatado = 'SIM';
      } else {
        Array[i].statusformatado = 'NÃO';
      }
    }
    return Array;
  }

  formataAtivoeInativo(Array: any) {
    // TODO async método Service
    (async () => {
      await Promise.all(
        Array.map(async (child) => {
          if (child.status === true) {
            child.statusformatado = 'ATIVO';
          } else {
            child.statusformatado = 'INATIVO';
          }
        })
      );
    })();
    return Array;
  }

  countPaginator(Array: any) {
    const value = Array.length;
    return value;
  }

  removeAcento(text: string) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text;
  }
}
