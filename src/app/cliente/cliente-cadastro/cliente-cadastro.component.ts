import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Cliente } from '../../shared/model';
import { ClienteService } from '../cliente.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  cliente = new Cliente();
  @ViewChild('tabela') grid!: any;

  tipos = [
    { label: 'Pessoa Física', value: 'PF' },
    { label: 'Pessoa Jurídica', value: 'PJ' },
  ];

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    const codigoCliente = this.route.snapshot.params['id'];

    this.title.setTitle('Nova cliente');

    if (codigoCliente) {
      this.carregarCliente(codigoCliente);
    }
  }

  get editando() {
    return Boolean(this.cliente.id)
  }

  carregarCliente(codigo: number) {
    this.clienteService.buscarPorCodigo(codigo)
      .then((cliente:Cliente) => {
        this.cliente = cliente;
        this.atualizarTituloEdicao();
      })
      .catch((erro:any) => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarCliente(form);
    } else {
      this.adicionarCliente(form);
    }
  }

  adicionarCliente(form: NgForm) {
    this.clienteService.adicionar(this.cliente)
      .then((clienteAdicionado:Cliente) => {
        this.messageService.add({ severity: 'success', detail: 'Cliente adicionado com sucesso!' });
        this.router.navigate([`/clientes/${clienteAdicionado.id}/editar`]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCliente(form: NgForm) {
    this.clienteService.atualizar(this.cliente)
      .then(cliente => {
        this.cliente = cliente;

        this.messageService.add({ severity: 'success', detail: 'Cliente alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: NgForm) {
    form.reset();

    this.router.navigate(['/clientes/cadastrar']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cliente: ${this.cliente.nome}`);
  }

  confirmaExclusao(telefone: any) {
    this.confirmationService.confirm({
      message: 'Confirma exclusão do telefone?',
      accept: () => {
        this.excluirTelefone(telefone);
      }
    });
  }

  excluirTelefone(telefone: any) {

    this.clienteService.excluirTelefone(this.cliente.id, telefone.id)
      .then(
        () => {
          this.cliente.telefones = this.cliente.telefones.filter(produto => produto.id !== telefone.id);
          this.messageService.add({ severity: 'success', detail: 'Telefone excluído com sucesso!' })
        }
      )
      .catch((error) => this.errorHandler.handle(error))

  }
}
