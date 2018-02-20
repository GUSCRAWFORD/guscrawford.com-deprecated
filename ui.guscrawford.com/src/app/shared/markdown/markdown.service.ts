import { Injectable } from '@angular/core';
import * as marked from 'marked';
@Injectable()
export class MarkdownService {

  constructor() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
  }
  renderer:any;
  fromMarkdown(md:string) {
    if (md)
      return marked(md);
    return '';
  }
}
