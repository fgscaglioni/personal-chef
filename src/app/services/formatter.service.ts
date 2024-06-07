import { Injectable } from '@angular/core';
import * as showdown from 'showdown';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  private converter = new showdown.Converter();

  markdownToHtml(markdown: string) {
    const htmlContent = this.converter.makeHtml(markdown);
    return `<div class="markdown-content">${htmlContent}</div>`;
  }

}
