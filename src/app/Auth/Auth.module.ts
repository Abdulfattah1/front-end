import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignUpComponent } from "./sign-up/sign-up.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "signin",
    component: SignInComponent
  }
];

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class AuthModule {}
