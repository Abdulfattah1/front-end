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
  constructor(
    private postservice: postService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formPost = new FormGroup({
      textarea: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      image: new FormControl(null, Validators.required)
    });
  }

  onPickPhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.formPost.patchValue({
      image: file
    });

    this.formPost.get("image").updateValueAndValidity();

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePrev = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  onSubmit() {
    const post = this.formPost.value;
    this.postservice.createPost(post).subscribe(response => {
      const data = response;
      if (data.success) {
        this.postservice.addPost.next({
          textarea: this.formPost.value.textarea,
          postId: data.postId
        });
        this.formPost.reset();
      } else {
      }
    });
  }
}
