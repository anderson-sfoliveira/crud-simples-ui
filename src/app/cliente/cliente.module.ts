import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { SharedModule } from '../shared/shared.module';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClientePesquisaComponent } from './cliente-pesquisa/cliente-pesquisa.component';
import { TelefoneCadastroComponent } from './telefone-cadastro/telefone-cadastro.component';
import { ErrorHandlerService } from '../shared/error-handler.service';


@NgModule({
  declarations: [
    ClienteCadastroComponent,
    ClientePesquisaComponent,
    TelefoneCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    SelectButtonModule,
    CheckboxModule,
    ToastModule,
    ConfirmDialogModule,

    SharedModule
  ],
  exports: [
    ClienteCadastroComponent,
    ClientePesquisaComponent,
    TelefoneCadastroComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    ErrorHandlerService,
    ConfirmationService
  ]
})
export class ClienteModule { }
