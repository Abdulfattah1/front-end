import { Component, OnInit } from "@angular/core";
import { postService } from "../posts.service";
import * as $ from "jquery";
@Component({
  selector: "app-delete-post",
  templateUrl: "./delete-post.component.html",
  styleUrls: ["./delete-post.component.css"]
})
export class DeletePostComponent implements OnInit {
  constructor(private postService: postService) {}
  post: {
    postId: number;
    userId: number;
    textContent: string;
    postIndex: number;
  };
  ngOnInit() {
    this.postService.openDeleteWindow.subscribe(Response => {
      this.post = Response;
      // $("body").css("overflow", "hidden");
      $(".colorOverlay").css({
        visibility: "visible",
        opacity: 0.7
      });
      $(".delete-post").css({
        visibility: "visible",
        opacity: 1
      });
    });
    console.log(this.post);
  }

  delete() {
    this.postService
      .deletePost(this.post.postId, this.post.userId)
      .subscribe(response => {
        const data = response;
        if (data.success) {
          this.postService.deletePostEvent.next(this.post.postIndex);
          console.log("deleted");
        } else {
          console.log("not deleted");
        }
      });
    this.close();
  }

  edit() {
    this.close();
    this.postService.openUpdateWindow.next(this.post);
  }

  close() {
    $(".colorOverlay, .delete-post").css({
      opacity: 0,
      visibility: "hidden"
    });
    $("body").css("overflow", "auto");
  }
}
