import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Usuario } from './usuario';

const KEY = 'avatarUrl';

@Injectable()
export class UsuarioService {

    private _usuarioLogado: Usuario;

    constructor(private _http: Http) {}

    efetuaLogin(email: string, senha: string) {

          return this._http.get(`https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`)
            .map(res => res.json().usuario)    
            .toPromise()    
            .then(usuario => {
                 this._usuarioLogado = new Usuario(usuario.nome, 
                    usuario.dataNascimento, 
                    usuario.email, 
                    usuario.telefone); 
            });
    }

    obtemUsuarioLogado(): Usuario {

        return this._usuarioLogado;
    }

    guardaAvatar(url) {
        localStorage.setItem(KEY, url);
    }

    obtemAvatar(): string {
        return localStorage.getItem(KEY);
    }
}