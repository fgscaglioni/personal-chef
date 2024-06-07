import { Injectable } from '@angular/core';
import OpenAI from "openai";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  private openai: OpenAI
  private config = {
    model: "gpt-4o",
    temperature: 1.25,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }
  private systemInstruction: string = ''

  constructor() {
    this.openai = new OpenAI({
      apiKey: environment.openai.api.key,
      dangerouslyAllowBrowser: true
    });
  }

  setInstruction(instruction: string) {
    this.systemInstruction = instruction
  }

  async chat(message: string): Promise<string> {
    if (!this.systemInstruction) throw new Error('Instruction not set')

    const completion = await this.openai.chat.completions.create({
      ...this.config,
      messages: [
        { role: "system", content: this.systemInstruction },
        { role: "user", content: message },
      ]
    });

    return completion.choices[0].message.content ?? '';
  }

}
