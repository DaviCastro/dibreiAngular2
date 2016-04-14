import {Page} from 'ionic-angular';
import {JogadorService} from '../../jogador/jogadorService';

@Page({
    templateUrl: 'build/pages/page2/page2.html',
})
export class Page2 {


    private jogadoresPorTime: number;
    private avulsoMedio: boolean;
    private serviceJogador: JogadorService;

    constructor(_jogadorService: JogadorService) {
        this.jogadoresPorTime = _jogadorService.getJogadoresPorTime();
        this.avulsoMedio = _jogadorService.getAvulsoMedio();
        this.serviceJogador = _jogadorService;

    }

    onPageWillLeave() {
        this.serviceJogador.setJogadoresPorTime(parseInt(this.jogadoresPorTime));
        this.serviceJogador.setAvulsoMedio(this.avulsoMedio);
    }





}
