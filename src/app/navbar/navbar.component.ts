import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../Auth/Auth.service";
import { Subscription } from "rxjs";
import { User } from "../shared/user.model";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html"
  //styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  signInSubscription: Subscription;
  isAuthentication: boolean = false;
  constructor(private AuthService: AuthService) {}
  user: User;
  ngOnInit() {
    this.isAuthentication = this.AuthService.getIsAuthenticated();
    this.user = this.AuthService.getUser();

    this.signInSubscription = this.AuthService.SignIn.subscribe(respone => {
      this.user = this.AuthService.getUser();
      this.isAuthentication = respone;
    });
  }

  onLogOut() {
    this.AuthService.logOut();
  }

  ngOnDestroy() {
    this.signInSubscription.unsubscribe();
  }
}
