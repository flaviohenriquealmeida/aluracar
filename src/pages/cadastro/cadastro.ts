import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert} from 'ionic-angular';
import { Carro } from '../../app/carro/carro';
import { HomePage } from '../home/home';
import { Agendamento } from '../../app/agendamento/agendamento';
import { AgendamentoDao } from '../../app/agendamento/agendamento-dao';
import { AgendamentoService } from '../../app/agendamento/agendamento-service';
import { Vibration, DatePicker } from 'ionic-native';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public agendamento: Agendamento;

  private _alerta: Alert;

  constructor(
      public navCtrl: NavController, 
      navParams: NavParams,
      private _alertCtrl: AlertController,
      private _dao: AgendamentoDao, 
      private _agendamentoService: AgendamentoService) {

    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');

    this.agendamento = new Agendamento(0, this.carro, this.precoTotal);

    this._alerta =  this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'OK', handler: () => navCtrl.setRoot(HomePage) }]
    });

  }

  agenda() {
    
    if(!this.agendamento.nome || !this.agendamento.email || !this.agendamento.endereco) {
      
      Vibration.vibrate(400);
      
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'OK'}]
      }).present();

      return ;
    }

    this._agendamentoService
      .agenda(this.agendamento)
      .then(() => {
          
          this.agendamento.confirmado = true;
          this._dao
            .adiciona(this.agendamento)
            .then(() => {
              this._alerta.setSubTitle('Agendamento realizado com sucesso');
              this._alerta.present();
            });
            
      })
      .catch(erro => {
          
          this._dao
            .adiciona(this.agendamento)
            .then(() => {
              this._alerta.setSubTitle('Não foi possível realizar o agendamento');
              this._alerta.present();
          });
          
        });
  }

  selecionaData() {

    DatePicker.show({
      date: new Date(),
      mode: 'date'
    })
    .then(data => this.agendamento.data =  data.toISOString());
  }
}
