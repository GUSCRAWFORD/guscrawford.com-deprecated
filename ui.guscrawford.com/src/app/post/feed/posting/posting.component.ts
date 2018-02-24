import { Component,
  OnInit, DoCheck,
  Input,
  Output, EventEmitter,
  ViewChild, ElementRef
} from '@angular/core';
import {
  Post, PostView
} from '../../../shared';
import {
 MarkdownPreviewComponent
} from '../../../shared/markdown/markdown-preview.component'
export const MAX_PREVIEW_LINES = 5, MAX_PREVIEW_CHARS = 160, ALT_HASH_CONTROL_CHAR="#";
@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit, DoCheck {

  constructor(private element: ElementRef) { }

  private model :{
    post: Post&PostView;
  } = {
    post: null
  }
  @ViewChild(MarkdownPreviewComponent)
  markdownPreview: MarkdownPreviewComponent;

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
          titles = val.content.match(/\#\s.*/g),
          images = val.content.match(imageRegExp),
          imageless = val.content.replace(imageRegExp,''),
          imagelessLines = imageless.match(/.*/g).filter(m=>!!m),
          preview = imagelessLines?imagelessLines.slice(0,MAX_PREVIEW_LINES).join('\n\n').replace(/\|/g,' '):'',
          imageAlt = images && images[0] && images[0].match(/!\[.*\]/),
          image = images && images[0] && images[0].match(/\(.*\)/);

      if (titles && titles.length) this.onTitleChange.emit(titles[0].substring(1).trim());
      else this.onTitleChange.emit('');

      if (image && image.length) this.onImageChange.emit(image[0].substr(1,image[0].length-2));
      else this.onImageChange.emit('');

      if (imageAlt && imageAlt.length) this.onImageAltChange.emit(imageAlt[0].substr(2,imageAlt[0].length-3));
      else this.onImageAltChange.emit('');
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
    this.markdownPreview;
    this.imageAltHashTagControl(this.element.nativeElement.children[0].children);
  }
  imageAltHashTagControl(domCollection) {
    if (domCollection)
      for (var node in domCollection) {
        if (domCollection[node].nodeName === 'IMG') {
          let altDirective = domCollection[node].attributes.alt.value?domCollection[node].attributes.alt.value.split(ALT_HASH_CONTROL_CHAR):'';
          switch (altDirective[1]) {
            case 'hide-in-post':
              domCollection[node].style.visibility = 'hidden';
              domCollection[node].style.display = 'none';
              domCollection[node].attributes.alt.value = altDirective[0]
              break;
            default:
          }
        }
        else if (domCollection[node].children) this.imageAltHashTagControl(domCollection[node].children);
      }
  }
}
