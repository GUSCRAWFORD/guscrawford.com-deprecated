import { Component, OnInit, Input,
  Output, EventEmitter } from '@angular/core';
import {
  Post, PostView
} from '../../shared';
@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {

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
    if (val) {
      let imageRegExp = /!\[(.+)\]\((.+)\)/g,
          titles = val.content.match(/\#.*/g),
          images = val.content.match(imageRegExp),
          imageless = val.content.replace(imageRegExp,''),
          imageAlt = images && images[0] && images[0].match(/!\[.*\]/),
          image = images && images[0] && images[0].match(/\(.*\)/);
      if (titles && titles.length) this.onTitleChange.emit(titles[0].substring(1));
      if (image && image.length) this.onImageChange.emit(image[0].substr(1,image[0].length-2));
      if (imageAlt && imageAlt.length) this.onImageAltChange.emit(imageAlt[0].substr(2,imageAlt[0].length-3));
      this.onPreviewChange.emit(imageless.substr(0,100)+'...')
    }
  };
  get post() {
    return this.model.post;
  }
  ngOnInit() {

  }

}
