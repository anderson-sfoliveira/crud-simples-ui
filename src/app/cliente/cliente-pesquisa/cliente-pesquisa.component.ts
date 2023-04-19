import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from '../../shared/error-handler.service';
import { ClienteService, ClienteFiltro } from '../cliente.service'

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.component.html',
  styleUrls: ['./cliente-pesquisa.component.css']
})
export class ClientePesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new ClienteFiltro()
  cliente: any[] = [];
  @ViewChild('tabela') grid!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de clientes');
    this.pesquisar();
  }

  pesquisar(): void {
    this.clienteService.listarTodas(this.filtro)
      .then((dados: any) => {
        this.cliente = dados;
      });
  }

  confirmarExclusao(cliente: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir cliente?',
      accept: () => {
          this.excluir(cliente);
      }
    });
  }

  excluir(cliente: any) {
    this.clienteService.excluir(cliente.id)
      .then(
        () => {
          this.pesquisar();
          this.messageService.add({ severity: 'success', detail: 'Cliente excluído com sucesso!' })
        }
      )
      .catch((error) => this.errorHandler.handle(error))
  }
}
