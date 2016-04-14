/**
 * name
 */
import {Jogador} from '../jogador/jogador';
export class Time {
    
    jogadores:Jogador[];
    time:number;
    
    constructor(_time:number,_jogadores:Jogador[]) {
        this.jogadores = _jogadores;
        this.time = _time;
    }
    
    getNotaTotal():number{
       return this.jogadores.reduce((memo, jogador):number => {
                return memo + jogador.nota;
            }, 0);
    }
}