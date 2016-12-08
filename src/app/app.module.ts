import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { EscolhaPage } from '../pages/escolha/escolha';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ConnectionFactory } from './infra/connection-factory';
import { AgendamentoDao } from './agendamento/agendamento-dao';
import { AgendamentosPage } from '../pages/agendamentos/agendamentos';
import { AgendamentoService } from './agendamento/agendamento-service';
import { LoginPage } from '../pages/login/login';
import { UsuarioService } from './usuario/usuario.service';

import { PerfilPage } from '../pages/perfil/perfil';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage, 
    LoginPage, 
    PerfilPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage, 
    AgendamentosPage, 
    LoginPage, 
    PerfilPage
  ],
  providers: [ConnectionFactory, AgendamentoDao, AgendamentoService, UsuarioService]
})
export class AppModule {}
