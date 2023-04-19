export class Cliente {
  id: number=0;
  nome?: string;
  tipo = 'PF';
  cpfCnpj?: string;
  rgIe?: string;
  dataCadastro?: Date = new Date();
  ativo?:boolean=true;
  telefones:Telefone[] = [];
}

export class Telefone {
  id?: number;
  numero?: string;
}
