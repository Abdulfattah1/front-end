import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { postService } from "../posts.service";
import { AuthService } from "src/app/Auth/Auth.service";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {
  formPost: FormGroup;
  imagePrev;
  loading: boolean;
  constructor(
    private postservice: postService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formPost = new FormGroup({
      textarea: new FormControl(null, Validators.required),
      image: new FormControl(null)
    });
  }

  onPickPhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formPost.patchValue({
      image: file
    });
    this.formPost.get("textarea").clearValidators();
    this.formPost.get("textarea").updateValueAndValidity();

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePrev = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  onSubmit() {
    this.loading = true;
    const post = this.formPost.value;
    if (!post.textarea) post.textarea = "";
    if (!post.image) post.image = "";
    this.postservice.createPost(post).subscribe(response => {
      const data = response;
      if (data.success) {
        this.postservice.addPost.next({
          textarea: this.formPost.value.textarea,
          postId: data.postId,
          imageUrl: data.imageUrl
        });
        this.formPost.reset();
        this.imagePrev = "";
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  close() {
    this.imagePrev = "";
  }
}
