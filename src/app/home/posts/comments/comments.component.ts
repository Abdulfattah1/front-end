import { Component, OnInit, Input } from "@angular/core";
import { commentService } from "./comment.service";
import { AuthService } from "src/app/Auth/Auth.service";
import { User } from "src/app/shared/user.model";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  @Input() postId;
  user: User;
  commentsArray: any;
  constructor(
    private commentServeice: commentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.commentServeice.addCommentEvent.subscribe(comment => {
      const data = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        dateOfPosting: Date.now(),
        textContent: comment.textContent,
        postId: comment.postId
      };
      this.commentsArray.unshift(data);
    });

    this.commentServeice.getComments(this.postId).subscribe(Response => {
      const data = Response.json();
      if (data.success) {
        this.commentsArray = data.comments;
      } else {
        console.log(data.message);
      }
    });
  }
}
