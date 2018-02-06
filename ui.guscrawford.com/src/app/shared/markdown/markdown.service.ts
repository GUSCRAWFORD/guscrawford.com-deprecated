import { Injectable } from '@angular/core';
import { markdown } from 'markdown';
@Injectable()
export class MarkdownService {

  constructor() { }

  fromMarkdown(md:string) {
    if (md)
      return markdown.toHTML(md);
    return '';
  }
}
