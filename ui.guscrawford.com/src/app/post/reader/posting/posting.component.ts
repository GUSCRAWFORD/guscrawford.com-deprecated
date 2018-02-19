import { Component,
  OnInit, DoCheck,
  Input,
  Output, EventEmitter } from '@angular/core';
import {
  Post, PostView
} from '../../../shared';
export const MAX_PREVIEW_LINES = 5, MAX_PREVIEW_CHARS = 160;
@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit, DoCheck {

  constructor() { }

  private model :{
    post: Post&PostView;
  } = {
    post: null
  }

  @Output('title')
  onTitleChange = new EventEmitter<string>();

  @Output('image')
  onImageChange = new EventEmitter<string>();

  @Output('imageAlt')
  onImageAltChange = new EventEmitter<string>();

  @Output('preview')
  onPreviewChange = new EventEmitter<string>();

  @Input()
  set post(val:Post&PostView) {
    this.model.post = val;
    if (val && val.content) {
      let imageRegExp = /!\[(.*)\]\((.*)\)/g,
          titles = val.content.match(/\#.*/g),
          images = val.content.match(imageRegExp),
          imageless = val.content.replace(imageRegExp,''),
          imagelessLines = imageless.match(/.*/g).filter(m=>!!m),
          preview = imagelessLines?imagelessLines.slice(0,MAX_PREVIEW_LINES).join('\n\n'):'',
          imageAlt = images && images[0] && images[0].match(/!\[.*\]/),
          image = images && images[0] && images[0].match(/\(.*\)/);
      if (titles && titles.length) this.onTitleChange.emit(titles[0].substring(1));
      if (image && image.length) this.onImageChange.emit(image[0].substr(1,image[0].length-2));
      if (imageAlt && imageAlt.length) this.onImageAltChange.emit(imageAlt[0].substr(2,imageAlt[0].length-3));
      this.onPreviewChange.emit(preview.length>MAX_PREVIEW_CHARS?(preview.substring(0, MAX_PREVIEW_CHARS)+'...'):preview+(imagelessLines.length > MAX_PREVIEW_LINES?'...':''))
    }
  };
  get post() {
    return this.model.post;
  }
  ngOnInit() {

  }
  ngDoCheck() {
    this.post = this.post;
  }
}
