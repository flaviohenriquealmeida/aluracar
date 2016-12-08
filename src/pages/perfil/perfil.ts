import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioService } from '../../app/usuario/usuario.service';
import { Usuario } from '../../app/usuario/usuario';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage implements OnInit {

  public url: string;

  constructor(public navCtrl: NavController, private _usuarioService: UsuarioService) {}

  ngOnInit() {
    this.url = this._usuarioService.obtemAvatar();
  }
  
  get usuario(): Usuario {
    
    return this._usuarioService.obtemUsuarioLogado();
  }

  tiraFoto() {
    Camera.getPicture({
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true,
        saveToPhotoAlbum: true
    })
    .then(url => {
      this._usuarioService.guardaAvatar(url);
      this.url = url;
    })
    .catch(erro => console.log(erro));

  }
}
