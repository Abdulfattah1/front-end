import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/Auth/Auth.service";
import { User } from "src/app/shared/user.model";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  constructor(private authService: AuthService) {}
  user: User;
  isReady: boolean = false;
  ngOnInit() {
    this.authService.getUserInformation().subscribe(res => {
      const data = res.json();
      this.isReady = true;
      this.user = data.userinfo;
    });
  }
}
