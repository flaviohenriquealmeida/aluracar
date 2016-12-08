export class Acessorio {

    constructor(private _nome: string, private _preco: number) {}
    
    get nome() {
        return this._nome;
    }

    get preco() {
        return this._preco;
    }
}