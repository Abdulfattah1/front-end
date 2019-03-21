import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { Post } from "./post/post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
@Injectable()
export class postService {
  postArray;
  changeTheArrayOfPosts = new Subject<any>();
  addPost = new Subject<any>(); //to add post to the post array
  deletePostEvent = new Subject<any>(); //to delete a post from the post array
  openModal = new Subject<any>(); // to open the model
  openUpdateWindow = new Subject<any>(); //open edit popUp
  sendBackEditInfo = new Subject<any>(); //to send back the information of the post that we have just edited
  openDeleteWindow = new Subject<any>();
  constructor(private http: HttpClient) {}

  getAuth() {
    const header = new HttpHeaders({
      authorization: localStorage.getItem("token")
    });

    return header;
  }

  createPost(post) {
    console.log(post);
    let formData = new FormData();
    formData.append("textarea", post.textarea);
    formData.append("image", post.image || "");
    return this.http.post<any>(
      "http://localhost:3000/posts/createPost",
      formData,
      {
        headers: this.getAuth()
      }
    );
  }

  getAllPosts() {
    this.http
      .get<any>("http://localhost:3000/posts/getAllPosts", {
        headers: this.getAuth()
      })
      .subscribe(response => {
        const data = response;
        if (data.success) {
          this.postArray = data;
          this.changeTheArrayOfPosts.next(this.postArray);
        }
      });
  }

  getPosts(page, numberOfPosts) {
    return this.http
      .get<any>(
        "http://localhost:3000/posts/getPosts?page=" +
          page +
          "&number=" +
          numberOfPosts,
        { headers: this.getAuth() }
      )
      .subscribe(response => {
        const data = response;
        if (data.success) {
          this.postArray = data;
          this.changeTheArrayOfPosts.next(this.postArray);
        }
      });
  }

  like(postId) {
    return this.http.post<any>(
      "http://localhost:3000/posts/like",
      { postId: postId },
      { headers: this.getAuth() }
    );
  }

  disLike(postId) {
    return this.http.post<any>(
      "http://localhost:3000/posts/disLike",
      { postId: postId },
      { headers: this.getAuth() }
    );
  }

  checkLike(postId) {
    return this.http.post<any>(
      "http://localhost:3000/posts/checkLike",
      { postId: postId },
      { headers: this.getAuth() }
    );
  }

  getNumberOfLikes(postId) {
    return this.http.post<any>(
      "http://localhost:3000/posts/getNumberOfLikes",
      {
        postId: postId
      },
      { headers: this.getAuth() }
    );
  }

  getLikesWithNames(postId) {
    return this.http.get<any>(
      "http://localhost:3000/posts/getLikesWithNames" + "?postId=" + postId,
      {
        headers: this.getAuth()
      }
    );
  }

  deletePost(postId: number, postUserId) {
    return this.http.delete<any>(
      "http://localhost:3000/posts/deletePost" + "?postId=" + postId,
      {
        headers: this.getAuth()
      }
    );
  }

  editPost(post: { postId: number; textContent: string }) {
    return this.http.post<any>("http://localhost:3000/posts/editPost", post, {
      headers: this.getAuth()
    });
  }
}
