import { Component, OnInit, Input } from "@angular/core";
import { postService } from "../posts.service";
import { Post } from "./post.model";
import { TimeCulculation } from "src/app/shared/timeCalculation";
import { Observable, observable, Observer } from "rxjs";
import { AuthService } from "src/app/Auth/Auth.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  @Input() post;
  likedClass: string;
  postId: number;
  userId: number;
  disabled: boolean;
  you: boolean;
  numberOfLikes: number;
  DisplayComment: boolean;
  TimeMessage: string;
  auth: boolean;

  @Input() postIndex: number;
  constructor(
    private postService: postService,
    private authService: AuthService
  ) {
    this.likedClass = "word";
    this.disabled = false;
    this.DisplayComment = false;
    this.auth = false;
  }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.auth = this.userId === this.post.userId ? true : false;
    this.post.dateOfPosting = this.TimeCulculation(this.post.dateOfPosting);
    this.postId = this.post.postId;
    this.postService.checkLike(this.postId).subscribe(Response => {
      const data = Response.json();
      if (data.message === "found") {
        this.you = true;
        this.likedClass = "word-1";
      } else if (data.message === "not found") {
        this.you = false;
        this.likedClass = "word";
      }
    });
  }

  like(postId: number) {
    if (this.likedClass === "word") {
      this.disabled = true;
      this.postService.like(postId).subscribe(Response => {
        const data = Response.json();
        if (data.success) {
          this.you = true;

          this.likedClass = "word-1";
          this.postService.getNumberOfLikes(this.postId).subscribe(response => {
            const data = response.json();
            if (data.success) {
              this.post.NumberOfLikes = data.count;
            }
          });
        } else {
          this.you = false;
          this.likedClass = "word";
        }
        this.disabled = false;
      });
    } else {
      this.postService.disLike(postId).subscribe(Response => {
        this.disabled = true;
        const data = Response.json();
        if (data.success) {
          this.you = false;
          this.likedClass = "word";
          this.postService.getNumberOfLikes(this.postId).subscribe(response => {
            const data = response.json();
            if (data.success) {
              this.post.NumberOfLikes = data.count;
            }
          });
        } else {
          this.you = true;
          this.likedClass = "word-1";
        }
        this.disabled = false;
      });
    }
  }

  displayComment(postId) {
    if (this.DisplayComment) {
      this.DisplayComment = false;
    } else {
      this.DisplayComment = true;
    }
  }

  deletePost() {
    if (confirm("Are you sure you want to delete this post?")) {
      this.postService
        .deletePost(this.post.postId, this.post.userId)
        .subscribe(response => {
          const data = response.json();
          if (data.success) {
            this.postService.deletePostEvent.next(this.postIndex);
            console.log("deleted");
          } else {
            console.log("not deleted");
          }
        });
    }
  }

  update() {
    this.postService.openUpdateWindow.next({
      postId: this.postId,
      textContent: this.post.textContent,
      postIndex: this.postIndex
    });
  }

  openModel(type: string) {
    this.postService.openModal.next({
      type: type,
      postId: this.postId
    });
  }

  TimeCulculation(date: string) {
    const DATE = new Date(Date.parse(this.post.dateOfPosting));
    const now = new Date();
    const Time = now.getTime() - DATE.getTime();
    const minutes = Math.floor(Time / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    this.TimeMessage = "now";
    if (minutes === 0) {
      this.TimeMessage = "a few seconds ago";
    } else if (minutes >= 1 && minutes < 60) {
      if (minutes === 1) {
        this.TimeMessage = minutes + " minute";
      } else {
        this.TimeMessage = minutes + " minutes";
      }
    } else if (hours >= 1 && hours < 24) {
      if (hours === 1) {
        this.TimeMessage = hours + " hour";
      } else {
        this.TimeMessage = hours + " hours";
      }
    } else if (days >= 1 && days < 7) {
      if (days === 1) {
        this.TimeMessage = days + " day";
      } else {
        this.TimeMessage = days + " days";
      }
    } else if (months >= 1 && months < 12) {
      if (months === 1) {
        this.TimeMessage = months + " month";
      } else {
        this.TimeMessage = months + " months";
      }
    } else if (weeks >= 1 && weeks < 52) {
      if (weeks === 1) {
        this.TimeMessage = weeks + " week";
      } else {
        this.TimeMessage = weeks + " weeks";
      }
    } else if (years >= 1) {
      if (years === 1) {
        this.TimeMessage = years + " year";
      } else {
        this.TimeMessage = years + " years";
      }
    }
    return this.TimeMessage;
  }
}
