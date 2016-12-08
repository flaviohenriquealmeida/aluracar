export class Carro {

    constructor(private _nome: string, private _preco: number) {}

    get nome() {
        return this._nome.toUpperCase();
    }

    get preco() {
        return this._preco;
    }
}