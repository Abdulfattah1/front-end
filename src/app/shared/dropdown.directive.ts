import { Directive, HostListener, HostBinding, Output } from '@angular/core';
import { commentService } from '../home/posts/comments/comment.service';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @Output() displayList;
  @HostListener('click') openSettings() {
    this.commentService.openSettings.next();
  }
  constructor(private commentService:commentService) {

  }

}
