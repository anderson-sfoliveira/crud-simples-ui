import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteCadastroComponent } from './cliente/cliente-cadastro/cliente-cadastro.component';
import { ClientePesquisaComponent } from './cliente/cliente-pesquisa/cliente-pesquisa.component';
import { TelefoneCadastroComponent } from './cliente/telefone-cadastro/telefone-cadastro.component';
import { PaginaNaoEncontradaComponent } from './shared/pagina-nao-encontrada.component';

// array de configurações de rotas
const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientePesquisaComponent },
  { path: 'clientes/cadastrar', component: ClienteCadastroComponent },
  { path: 'clientes/:id/editar', component: ClienteCadastroComponent },
  { path: 'clientes/:id/telefone', component: TelefoneCadastroComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' } // deixar sempre por último, para que o Angular verifique todas as rotas antes de redirecionar para a pagina-nao-encontrada.
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
