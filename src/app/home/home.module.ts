import { NgModule } from "@angular/core";

import { UserInfoComponent } from "./user-info/user-info.component";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { AuthGuard } from "../guards/auth.guard";
import { PostsComponent } from "./posts/posts.component";
import { homeService } from "./home.service";
import { CreatePostComponent } from "./posts/create-post/create-post.component";
import { PostComponent } from "./posts/post/post.component";
import { postService } from "./posts/posts.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PopUpComponent } from "../shared/pop-up/pop-up.component";
import { CommentsComponent } from "./posts/comments/comments.component";
import { CommentComponent } from "./posts/comments/comment/comment.component";
import { CreateCommentComponent } from "./posts/comments/create-comment/create-comment.component";
import { commentService } from "./posts/comments/comment.service";
import { EditPostComponent } from './posts/edit-post/edit-post.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    UserInfoComponent,
    PostsComponent,
    CreatePostComponent,
    PostComponent,
    PopUpComponent,
    CreateCommentComponent,
    CommentsComponent,
    CommentComponent,
    EditPostComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [RouterModule],
  providers: [homeService, postService, commentService]
})
export class homeModule {}
