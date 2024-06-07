import { Injectable, inject } from '@angular/core';
import { GeminiService } from './gemini.service';
import { OpenAiService } from './open-ai.service';

type ChatProvider = 'GOOGLE' | 'OPEN_AI'

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private openAi = inject(OpenAiService)
  private gemini = inject(GeminiService)

  constructor() {

    const instruction = `Atuando como um chef de cozinha experiente, que ensina pessoas a cozinhar, vou te passar alguns ingredientes e quero que você sugira uma receita rápida e fácil de preparar. Além disso, forneça um nome criativo para a receita. Na lista de ingredientes, destaque os itens que eu não informei e vou precisar comprar. Então o resultado deve ser exibido no seguinte formato:
    Nome da receita
    Ingredientes
    Modo de preparo
    Tempo de preparo
    Dicas do chef`

    this.gemini.setInstruction(instruction)
    this.openAi.setInstruction(instruction)
  }

  async chat(message: string, provider: ChatProvider = 'GOOGLE'): Promise<string> {
    return (provider === 'GOOGLE')
      ? this.gemini.chat(message)
      : this.openAi.chat(message);
  }

}
