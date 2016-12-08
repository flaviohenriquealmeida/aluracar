export class Usuario {

    constructor(private _nome: string, private _dataNascimento: string, private _email: string, private _telefone: string) {}

    get nome(): string {
        return this._nome;
    }

    get dataNascimento(): string {
        return this._dataNascimento;
    }

    get email(): string {
        return this._email;
    }

    get telefone(): string {
        return this._telefone;
    }
}
