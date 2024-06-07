import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { AboutComponent } from '../about/about.component';
import { ChefService } from '../services/chef.service';
import { FormatterService } from '../services/formatter.service';
import { textResponse } from './test-variables';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private chefService = inject(ChefService)
  private formatter = inject(FormatterService)
  private domSanitizer = inject(DomSanitizer)
  private modalController = inject(ModalController)

  form: FormGroup
  htmlResponse: string = ''
  textResponseTest: string = textResponse
  loading: boolean = false

  constructor() {
    this.form = new FormGroup({
      ingredients: new FormControl('', Validators.required),
      model: new FormControl('GOOGLE', Validators.required),
    })
  }

  generateWaitingMessage() {
    const messages = ["Um segundo... só preciso encontrar a receita perfeita!",
      "Mergulhado no mundo dos temperos e sabores... volto em breve!",
      "Perdido em um labirinto de receitas, mas determinado a encontrar a delícia ideal!",
      "Navegando pelas páginas culinárias em busca do prato dos sonhos!",
      "Desvendando os segredos da cozinha com a ajuda do meu fiel livro de receitas!",
      "Na caça pela receita que irá conquistar o paladar de todos!",
      "Com fome de inspiração? Aguardem, estou em busca da próxima aventura culinária!",
      "Um minuto, só preciso decifrar este código culinário!",
      "Mergulhando de cabeça no oceano de receitas, em busca da pérola perfeita!",
      "A cozinha me chama, e o livro de receitas me guia!",
      "Desvendando os mistérios da culinária com a ajuda do meu guia gastronômico!",
      "Em busca da receita que será a estrela da próxima refeição!",
      "Com o livro de receitas em mãos, a aventura culinária está apenas começando!",
      "Perdido entre as páginas, mas com o coração e o estômago cheios de expectativas!",
      "A cozinha é um palco, e o livro de receitas, meu guia para o sucesso!",
      "Preparando-se para uma explosão de sabores com a ajuda do meu livro mágico!",
      "Na busca incessante pela receita que trará sorrisos à mesa!",
      "Com o livro de receitas em uma mão e a criatividade na outra, tudo é possível!",
      "A cozinha é meu reino, e o livro de receitas, meu fiel súdito!",
      "Com o livro de receitas como bússola, a jornada culinária se torna ainda mais saborosa!",]

    const message = messages[Math.floor(Math.random() * messages.length)]

    const response = `<div class="waiting-message"><p>${message}</p></div>`

    return response
  }

  testResponse(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.textResponseTest)
      }, 6000)
    })
  }

  async onSubmit() {
    const { ingredients, model } = this.form.value
    if (!ingredients) return

    this.loading = true
    this.htmlResponse = this.generateWaitingMessage()
    const interval = setInterval(() => {
      this.htmlResponse = this.generateWaitingMessage()
    }, 3000)

    let response = ''
    // response = await this.testResponse()
    response = await this.chefService.chat(ingredients, model)

    const htmlResponse = this.formatter.markdownToHtml(response)

    clearInterval(interval)
    this.loading = false
    this.htmlResponse = <any>this.domSanitizer.bypassSecurityTrustHtml(htmlResponse)

    this.scrollToContent();
  }

  private scrollToContent() {
    setTimeout(() => {
      const markdownEl = <any>document.querySelector('.markdown-content')
      markdownEl.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }

  async about() {
    const about = await this.modalController.create({
      component: AboutComponent,
    })
    about.present()
  }

}
