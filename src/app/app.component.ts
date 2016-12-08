import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AgendamentosPage } from '../pages/agendamentos/agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  
  @ViewChild(Nav) public nav: Nav;

  rootPage = LoginPage;

  public paginas = [
    { titulo: 'Perfil', componente: PerfilPage},
    { titulo: 'Agendamentos', componente: AgendamentosPage }
  ];

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  abrePagina(pagina): void {
  
    this.nav.push(pagina.componente);
  }
}
