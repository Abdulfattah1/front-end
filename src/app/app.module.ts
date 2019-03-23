import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http"
import { AuthModule } from "./Auth/Auth.module";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxLoadingModule } from 'ngx-loading';

import { AppComponent } from "./app.component";
import { AuthService } from "./Auth/Auth.service";
import { ReactiveFormsModule, FormsModule, FormGroup } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Http, HttpModule } from "@angular/http";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthGuard } from "./guards/auth.guard";
import { PopUpComponent } from "./shared/pop-up/pop-up.component";
import { TestComponent } from './test/test.component';
import { sharedModel } from "./shared/shared.model";
//import { homeModule } from "./home/home.module";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    canActivate: [AuthGuard],
    loadChildren: "./home/home.module#homeModule"
  },
  {
    //Auth Module lazy loading
    path: "",
    loadChildren: "./Auth/Auth.module#AuthModule"
  },
  {
    path:"test",
    component:TestComponent
  }
];
@NgModule({
  declarations: [AppComponent, NavbarComponent, TestComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    InfiniteScrollModule,
    sharedModel,
    NgxLoadingModule.forRoot({})
  ],
  exports: [],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
