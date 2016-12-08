import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { UsuarioService } from '../../app/usuario/usuario.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email: string = 'joao@alura.com.br';
  public senha: string = 'alura123';

  constructor(
    public navCtrl: NavController, 
    private _usuarioService: UsuarioService,
    private _alertCtrl: AlertController, 
    private _loadingCtrl: LoadingController) {}

  efetuaLogin() {

    let loader = this._loadingCtrl.create({
      content: "Efetuando login, aguarde ...",
    });
    
    loader.present();
    this._usuarioService
      .efetuaLogin(this.email, this.senha)
      .then(() => {
        
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(erro => {
        
        console.log(erro);
        alert(erro);
        
        loader.dismiss(); 


        this._alertCtrl.create({
          title: 'Login inválido',
          subTitle: 'Login ou senha inválidos. Verifique',
          buttons: [{
            text: 'Tentar novamente'
          }]
        }).present()
      });
  }
}
