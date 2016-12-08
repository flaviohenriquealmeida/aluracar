import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Carro } from '../../app/carro/carro';
import { Acessorio } from '../../app/carro/acessorio';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
    templateUrl: 'escolha.html'
})
export class EscolhaPage {

    public carro: Carro;
    public acessorios: Acessorio[];
    private _precoTotal: number = 0;

    constructor(navParams: NavParams, private _navCtrl: NavController) {

        this.carro = navParams.get('carroSelecionado');
        this._precoTotal = this.carro.preco;
        this.acessorios = [
            new Acessorio('Freio ABS', 800),
            new Acessorio('Ar-condicionado',1000),
            new Acessorio('MP3 Player', 500)
        ];
        
    }

    get precoTotal() {
        return this._precoTotal;
    }

    atualizaTotal(ligado, acessorio): void {
    
        ligado ?
            this._precoTotal+= acessorio.preco :
            this._precoTotal-= acessorio.preco;
    }

    avancaNoAgendamento(): void {

        this._navCtrl.push(CadastroPage, {
            carro: this.carro, 
            precoTotal: this.precoTotal
        });
    }    

}