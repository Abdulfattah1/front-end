import { Component, OnInit } from "@angular/core";
import { postService } from "./posts.service";
import { Post } from "./post/post.model";
import { AuthService } from "src/app/Auth/Auth.service";

import * as $ from "jquery";
@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts;
  user;
  displayUpdate;
  constructor(
    private postService: postService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.displayUpdate = false;
    this.postService.changeTheArrayOfPosts.subscribe(Response => {
      this.posts = Response.posts;
    });
    this.postService.deletePostEvent.subscribe(postIndexDeleted => {
      this.posts.splice(postIndexDeleted, 1);
    });
    this.user = this.authService.getUser();

    this.postService.addPost.subscribe(createdPost => {
      this.posts.unshift({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        personalImage: this.user.personalImage,
        textContent: createdPost.textarea,
        postId: createdPost.postId,
        userId: this.user.id,
        dateOfPosting: Date.now(),
        NumberOfLikes: 0
      });
    });

    this.postService.sendBackEditInfo.subscribe(editedPost => {
      this.posts[editedPost.postIndex].textContent = editedPost.textContent;
    });

    this.postService.openModal.subscribe(response => {
      console.log(response);
      $("body").css("overflow", "hidden");
      $(".model").css({
        opacity: 1,
        visibility: "visible"
      });

      $(".colorOverlay").css({
        visibility: "visible",
        opacity: 0.7
      });

      $(".model").click(e => {
        //e.stopPropagation;
      });
      this.postService.fillOutTheModel.next(response);
    });

    this.postService.openUpdateWindow.subscribe(Response => {
      this.displayUpdate = true;
      $("body").css("overflow", "hidden");
      $(".colorOverlay").css({
        visibility: "visible",
        opacity: 0.7
      });
      $(".edit-post").css({
        visibility: "visible",
        opacity: 1
      });
      this.postService.fillOutTheEditPost.next(Response);
    });
  }
}
