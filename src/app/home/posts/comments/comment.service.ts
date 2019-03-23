import { Injectable, OnInit } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Subject } from "rxjs";
@Injectable()
export class commentService implements OnInit {
  link = "http://localhost:3000/comments/";

  addCommentEvent = new Subject<any>();
  openSettings = new Subject();
  constructor(private http: Http) {}

  ngOnInit() {}

  addComment(comment: { postId: number; textContent: string }) {
    const header = new Headers({
      authorization: localStorage.getItem("token")
    });
    return this.http.post(this.link + "addComment", comment, {
      headers: header
    });
  }

  getComments(postId: number) {
    const header = new Headers({
      authorization: localStorage.getItem("token")
    });

    return this.http.get(this.link + "getComments" + "?postId=" + postId, {
      headers: header
    });
  }
}
