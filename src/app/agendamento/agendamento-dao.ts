import { ConnectionFactory } from '../infra/connection-factory';
import { Agendamento } from './agendamento';
import { Injectable } from '@angular/core';
import { Carro } from '../carro/carro';

@Injectable()
export class AgendamentoDao {

    private _store: string = 'agendamentos';

    constructor(private _connectionFactory: ConnectionFactory){}

    adiciona(agendamento: Agendamento) {

        return new Promise((resolve, reject) => {
            
            this._connectionFactory
            .getConnection()
            .then((connection: any) => {

              // se é um novo, não pode ter ID  
              delete agendamento.id;

              let request = connection
                .transaction(this._store,'readwrite')
                .objectStore(this._store)
                .add(agendamento);

                request.onsuccess = () => resolve();
                request.onerror = erro => {
                    console.log(erro);
                    reject('Não foi possível gravar o agendamento no banco');
                };
            });
        });
    }

    lista():Promise<Agendamento[]> {

        return new Promise((resolve, reject)=> {
            this._connectionFactory
            .getConnection()
            .then((connection: any) => {

                let agendamentos = [];

                let cursor = connection
                    .transaction([this._store],'readwrite')
                    .objectStore(this._store)
                    .openCursor();
                
                cursor.onsuccess = (e: any) => {
                    
                    let atual = e.target.result;

                    if(atual) {

                        let dado = atual.value;
                        let carro = new Carro(dado.carro._nome, dado.carro._preco);   
                        let agendamento = new Agendamento(dado.id, carro, dado.valor, dado.nome,dado.endereco, dado.email, dado.data, dado.confirmado);
                        agendamentos.push(agendamento);
                        atual.continue(); // ir para o próximo!
                    } else { 
                        // quando já percorreu todos os agendamento
                        resolve(agendamentos);
                    }

                };

                cursor.onerror = (e: any) => {
                    console.log(e.target.error.name);
                    reject('Não foi possível listar os agendamento');

                }
            });

        });
    }

    altera(agendamento: Agendamento):Promise<void> {
        
        return new Promise((resolve, reject) => {
            this._connectionFactory
                .getConnection()
                .then((connection: any) => {

                    let request = connection
                        .transaction([this._store],'readwrite')
                        .objectStore(this._store)
                        .put(agendamento);

                    request.onsuccess = () => resolve();
                    request.onerror = erro => {
                        console.log(erro);
                        reject('Não foi possível alterar o agendamento');
                    }
                })
                .catch(erro => {
                    console.log(erro);
                    reject(erro)
                })
        });
    }

}