import { Component, OnInit, Input } from '@angular/core';
import {
  MarkdownService
} from './markdown.service'
@Component({
  selector: 'app-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.css']
})
export class MarkdownPreviewComponent implements OnInit {
  
  constructor(
    public markdown:MarkdownService
  ) { }

  @Input()
  content: string;
  
  ngOnInit() {
  }

}
