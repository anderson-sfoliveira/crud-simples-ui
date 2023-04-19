import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente, Telefone } from '../../shared/model';
import { ClienteService } from '../cliente.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Component({
  selector: 'app-telefone-cadastro',
  templateUrl: './telefone-cadastro.component.html',
  styleUrls: ['./telefone-cadastro.component.css']
})
export class TelefoneCadastroComponent implements OnInit {

  idCliente = 0;
  telefone = new Telefone();
  cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.idCliente = this.route.snapshot.params['id'];
    this.title.setTitle('Novo telefone');
    this.carregarCliente(this.idCliente);
  }

  carregarCliente(codigo: number) {
    this.clienteService.buscarPorCodigo(codigo)
      .then((cliente:Cliente) => {
        this.cliente = cliente;
      })
      .catch((erro:any) => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    form.control.markAllAsTouched();
    if (form.control.invalid) { return; }

    this.clienteService.adicionarTelefone(this.idCliente, this.telefone)
      .then((telefoneAdicionado:Telefone) => {
        this.router.navigate([`/clientes/${this.idCliente}/editar`]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
