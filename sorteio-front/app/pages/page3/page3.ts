import {Page} from 'ionic-angular';
import {JogadorService} from '../../jogador/jogadorService';
import {Jogador} from '../../jogador/jogador';
import {Time} from '../../jogador/time';
import {ValuesPipe} from '../../jogador/pipe';
@Page({
    templateUrl: 'build/pages/page3/page3.html',
    pipes:[ValuesPipe]
})




export class Page3 {

    private serviceJogador: JogadorService;

    private jogadores: Jogador[];

    private numeroJogadoresPorTime: number;

    private utilizarMediaAvulso: boolean;

    private numeroTimes: number;

    private numero: number[];
    
    private times:Array<Time>;
    
    constructor(_serviceJogador: JogadorService) {
        this.serviceJogador = _serviceJogador;
        this.init();
    }

    private init() {
        this.jogadores = this.serviceJogador.getJogadores();
        this.numeroJogadoresPorTime = this.serviceJogador.getJogadoresPorTime();
        this.utilizarMediaAvulso = this.serviceJogador.getAvulsoMedio();
        this.times =Array<Time>();
    }
    public construirTimes() {
        this.init();
        this.adicionaAvulsos();
        this.ordenaJogadores();
        this.numeroTimes = this.jogadores.length / this.numeroJogadoresPorTime;
        this.sortearTimes(this.numeroTimes);
        this.criarTimes(this.numeroTimes,this.jogadores);
    }

    private sortearTimes(numeroTimes: number) {

        this.jogadores.forEach(x => x.time = null);

        for (let i = 0; i < this.numeroJogadoresPorTime; i++) {

            for (let j = 0; j < numeroTimes; j++) {
                let min = i * numeroTimes;
                let max = min + numeroTimes - 1;

                while (this.faltamJogadoresNoPote(min, max)) {
                    let aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

                    if (this.jogadores[aleatorio].time === null) {
                        this.atribuirTime(j, this.jogadores[aleatorio]);
                        break;
                    }

                }

            }

        }



    }


    private criarTimes(numeroTimes: number,jogadores:Jogador[]){
            
            this.times = Array<Time>();
            
            for(let index = 0; index < numeroTimes; index++) {
                
                this.times.push(new Time(index,jogadores.filter((x:Jogador)=>x.time===index)));
                
            }

       
    }




    private atribuirTime(time: number, jogador: Jogador) {
        jogador.time = time;
    }


    private faltamJogadoresNoPote(min: number, max: number): boolean {
        for (let u = min; u <= max; u++) {

            if (this.jogadores[u].time === null) {
                return true;
            }
        }
        return false;
    }

    private ordenaJogadores() {
        this.jogadores.sort((a, b) => {
            if (a.nota === b.nota) {
                return Boolean(Math.round(Math.random())) ? 1 : -1;
            }
            return a.nota > b.nota ? -1 : 1;
        });
    }

    private adicionaAvulsos() {
        let notaAvulso = this.calcularMediaAvulso();
        let totalFaltantes = 0;
        if (this.jogadores.length % this.numeroJogadoresPorTime != 0) {
            totalFaltantes = this.numeroJogadoresPorTime - (this.jogadores.length % this.numeroJogadoresPorTime);
        }


        for (let index = 0; index < totalFaltantes; index++) {
            this.jogadores.push(new Jogador("NovoJogador " + (index + 1), notaAvulso, 0));
        }


    }

    private calcularMediaAvulso(): number {
        let mediaNota = 0;
        if (this.utilizarMediaAvulso) {


            let totalNota = this.jogadores.reduce((memo, jogador) => {
                return memo + jogador.nota;
            }, 0);

            mediaNota = Math.floor(totalNota / this.jogadores.length);

        }
        return mediaNota;
    }


}
