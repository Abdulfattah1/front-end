import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { postService } from "src/app/home/posts/posts.service";
@Component({
  selector: "app-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.css"]
})
export class PopUpComponent implements OnInit {
  content: [];
  constructor(private postService: postService) {}
  ngOnInit() {
    this.postService.fillOutTheModel.subscribe(Response => {
      if (Response.type === "likes") {
        this.postService
          .getLikesWithNames(Response.postId)
          .subscribe(result => {
            const data = result.json();
            this.content = data.likes;
          });
      }
    });
    $(".colorOverlay").click(() => {
      $(".model, .colorOverlay").css({
        opacity: 0,
        visibility: "hidden"
      });
      $("body").css("overflow", "auto");
    });
  }

  close() {
    $(".colorOverlay, .model").css({
      opacity: 0,
      visibility: "hidden"
    });
    $("body").css("overflow", "auto");
  }
}
