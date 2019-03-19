import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"]
})
export class CommentComponent implements OnInit {
  @Input() postId;
  @Input() comment;
  TimeMessage: string;
  constructor() {}

  ngOnInit() {
    this.TimeCulculation(this.comment.dateOfPosting);
  }

  TimeCulculation(date: string) {
    const DATE = new Date(Date.parse(date));
    const now = new Date();
    const Time = now.getTime() - DATE.getTime();
    const minutes = Math.floor(Time / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    if (minutes === 0) {
      this.TimeMessage = "a few seconds ago";
    } else if (minutes >= 1 && minutes < 60) {
      if (minutes === 1) {
        this.TimeMessage = minutes + " m";
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
