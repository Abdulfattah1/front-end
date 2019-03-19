import { Component, OnInit } from "@angular/core";
import { homeService } from "./home.service";
import { User } from "../shared/user.model";
import { AuthService } from "../Auth/Auth.service";
import { postService } from "./posts/posts.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private homeService: homeService,
    private authService: AuthService,
    private postService: postService
  ) {}
  ngOnInit() {
    this.postService.getAllPosts();
  }
}
