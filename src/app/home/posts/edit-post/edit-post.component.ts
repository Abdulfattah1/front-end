import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { postService } from "../posts.service";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.css"]
})
export class EditPostComponent implements OnInit {
  textContent: string;
  editForm: FormGroup;
  displayEditForm: boolean;
  postId: number;
  postIndex: number;
  constructor(private postService: postService) {}

  ngOnInit() {
    this.displayEditForm = false;
    $(".colorOverlay").click(() => {
      $(".edit-post, .colorOverlay").css({
        opacity: 0,
        visibility: "hidden"
      });
      $("body").css("overflow", "auto");
    });

    this.postService.openUpdateWindow.subscribe(Response => {
      // $("body").css("overflow", "hidden");
      $(".colorOverlay").css({
        visibility: "visible",
        opacity: 0.7
      });
      $(".edit-post").css({
        visibility: "visible",
        opacity: 1
      });
      this.editForm = new FormGroup({
        textContent: new FormControl(null)
      });
      this.displayEditForm = true;
      this.editForm.patchValue({
        textContent: Response.textContent
      });
      this.editForm.updateValueAndValidity();
      this.postId = Response.postId;
      this.postIndex = Response.postIndex;
    });
  }
  close() {
    $(".colorOverlay, .edit-post").css({
      opacity: 0,
      visibility: "hidden"
    });
    $("body").css("overflow", "auto");
  }

  editPost() {
    const post = {
      postId: this.postId,
      textContent: this.editForm.value.textContent
    };
    this.postService.editPost(post).subscribe(Response => {
      const data = Response;
      if (data.success) {
        console.log("eddited");
        this.postService.sendBackEditInfo.next({
          postId: this.postId,
          textContent: this.editForm.value.textContent,
          postIndex: this.postIndex
        });
      } else {
        console.log("not editeted");
      }
    });
    this.close();
  }
}
