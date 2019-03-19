import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { commentService } from "../comment.service";

@Component({
  selector: "app-create-comment",
  templateUrl: "./create-comment.component.html",
  styleUrls: ["./create-comment.component.css"]
})
export class CreateCommentComponent implements OnInit {
  commentForm: FormGroup;
  @Input() postId: number;
  constructor(private commentService: commentService) {}

  ngOnInit() {
    this.commentForm = new FormGroup({
      comment: new FormControl(null, [
        Validators.required,
        Validators.minLength(1)
      ])
    });
  }

  submit() {
    const comment = {
      textContent: this.commentForm.value.comment,
      postId: this.postId
    };
    this.commentService.addCommentEvent.next(comment);

    this.commentService.addComment(comment).subscribe(Response => {
      const data = Response.json();
      this.commentForm.reset();
    });
  }
}
