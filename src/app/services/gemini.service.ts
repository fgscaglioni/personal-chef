import { Injectable } from '@angular/core';
import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { environment } from 'src/environments/environment';

/*
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  private safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  private model!: GenerativeModel
  private chatSession!: ChatSession
  private systemInstruction: string = ''

  constructor() { }

  private createModel() {
    const apiKey = environment.gemini.api.key;
    const genAI = new GoogleGenerativeAI(apiKey);

    this.model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      systemInstruction: this.systemInstruction,
    });
  }

  private startSession() {
    this.chatSession = this.model.startChat({
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
      // history: [],
    });
  }

  setInstruction(instruction: string) {
    this.systemInstruction = instruction
    this.createModel()
    this.startSession();
  }

  async chat(message: string): Promise<string> {
    if (!this.systemInstruction) throw new Error('Instruction not set')
    const result = await this.chatSession.sendMessage(message);
    return result.response.text();
  }

}
