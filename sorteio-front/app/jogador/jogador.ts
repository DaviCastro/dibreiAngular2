/**
 * name
 */
export class Jogador {
    nota: number;
    nome: string;
    time: number;
    constructor(novoNome:string,novaNota:number,novoTime:number) {
        this.nome=novoNome;
        this.nota = novaNota;
        this.time = novoTime;
    }
}