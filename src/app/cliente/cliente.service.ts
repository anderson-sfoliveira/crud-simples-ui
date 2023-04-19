import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Cliente, Telefone } from '../shared/model';

export class ClienteFiltro {
  nome: string = '';
  ativo: boolean = false;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteUrl:string

  constructor(private http: HttpClient)  {
    this.clienteUrl = `${environment.apiURL}/api/clientes`
  }

  listarTodas(filtro: ClienteFiltro) : Promise<any> {
    let params = new HttpParams();
    params = params.set('nome', filtro.nome);
    params = params.set('ativo', filtro.ativo);

    return this.http.get(this.clienteUrl, { params })
      .toPromise()
      // .then(response => {
      //   this.converterStringsParaDatas(response);
      //   return response;
      // });
      .then(response => response);
  }

  // private converterStringsParaDatas(cliente: any) {
  //   console.log(cliente.dataCadastro);

  //   // if (cliente.dataCadastro) {
  //   //   cliente.dataCadastro = new Date(cliente.dataCadastro + "T00:00:00.000"); // tipo LocalDate
  //   // }

  //   // if (lancamento.cadastroData) {
  //   //   lancamento.cadastroData = new Date(lancamento.cadastroData); // tipo Instant
  //   // }
  // }

  buscarPorCodigo(codigo: number): Promise<Cliente> {
    return this.http.get<Cliente>(`${this.clienteUrl}/${codigo}`)
      .toPromise();
  }

  adicionar(cliente: Cliente): Promise<Cliente> {
    return this.http.post<Cliente>(this.clienteUrl, cliente)
      .toPromise();
  }

  atualizar(cliente: Cliente): Promise<Cliente> {
    return this.http.put<Cliente>(`${this.clienteUrl}/${cliente.id}`, cliente)
      .toPromise();
  }

  excluir(codigo: number) : Promise<void> {
    return this.http.delete<void>(`${this.clienteUrl}/${codigo}`).toPromise();
  }

  adicionarTelefone(id: number, telefone: Telefone): Promise<Telefone> {
    return this.http.post<Telefone>(`${this.clienteUrl}/${id}/telefones`, telefone).toPromise();
  }

  excluirTelefone(id: number, idTelefone: number) : Promise<void> {
    return this.http.delete<void>(`${this.clienteUrl}/${id}/telefones/${idTelefone}`).toPromise();
  }
}
