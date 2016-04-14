import {Injectable} from 'angular2/core';
import {Jogador} from '../jogador/jogador';
import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class JogadorService {

    private local: any;
    constructor() {
        this.local = new Storage(LocalStorage);
    }

   public getJogadores() {

        return JSON.parse(this.local.get("jogadores")._result)|| [];
    }

  public  setJogadores(jogadores: Jogador[]) {
        this.local.set("jogadores", JSON.stringify(jogadores));
    }

  public  getJogadoresPorTime():number {
        return JSON.parse(this.local.get("jogadoresPorTime")._result);
    }

   public setJogadoresPorTime(numero: number) {
        this.local.set("jogadoresPorTime", JSON.stringify(numero));
    }
    
    public getAvulsoMedio(){
        return JSON.parse(this.local.get("avulsoMedio")._result);
    }
    
    public setAvulsoMedio(avulso:boolean){
        this.local.set("avulsoMedio", JSON.stringify(avulso));
    }


}