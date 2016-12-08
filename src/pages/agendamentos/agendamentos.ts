import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AgendamentoDao } from '../../app/agendamento/agendamento-dao';
import { Agendamento } from '../../app/agendamento/agendamento';
import { AgendamentoService } from '../../app/agendamento/agendamento-service';

@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage {

  public agendamentos: Agendamento[];

  constructor(
      public navCtrl: NavController, 
      private _agendamentoDao: AgendamentoDao,
      private _agendamentoService: AgendamentoService, 
      private _alertCtrl: AlertController) {

    this._agendamentoDao
      .lista()
      .then((agendamentos: any) => this.agendamentos = agendamentos);
  }

  reenvia(agendamento: Agendamento) {

    this._agendamentoService
      .agenda(agendamento)
      .then(() => {
        agendamento.confirmado = true;
        return this._agendamentoDao.altera(agendamento)
      })
      .then(() => {

         this._alertCtrl.create({
            title: 'Agendamento!',
            subTitle: 'Reenvio realizado com sucesso!',
            buttons: [{ text: 'OK' }]
        }).present();

      })
      .catch(erro => {

        this._alertCtrl.create({
            title: 'Agendamento!',
            subTitle: 'Não foi possível realizar o reenvio',
            buttons: [{ text: 'OK' }]
        }).present();

      })
  }
}
