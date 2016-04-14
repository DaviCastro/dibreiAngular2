import {Page, Storage, LocalStorage,NavController,Alert} from 'ionic-angular';
import {Jogador} from '../../jogador/jogador';
import {JogadorService} from '../../jogador/jogadorService';

@Page({
    templateUrl: 'build/pages/page1/page1.html',
})


export class Page1 {
  

    private jogadores: Jogador[];
    private jogadorService:JogadorService;

    constructor(_jogadorService:JogadorService,public nav: NavController) {        
        this.jogadores = _jogadorService.getJogadores();
        this.jogadorService = _jogadorService;
    }
    addJogador(nome:string) {

        this.jogadores.push(new Jogador(nome, null, null));

    }

    removerJogador(jogador) {

        let index = this.jogadores.indexOf(jogador)
        if (index > -1) {
            this.jogadores.splice(index, 1);
        }

    }

    onPageWillLeave() {
        
        this.jogadores.forEach(x=> x.nota = parseInt(x.nota));
        
        this.jogadorService.setJogadores(this.jogadores);
    }
    
    
    doPrompt() {
    let prompt = Alert.create({
      title: 'Jogador',
      message: "Entre com o nome do Jogador",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.addJogador(data.nome);
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

}
