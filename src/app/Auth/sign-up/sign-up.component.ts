import { Component, OnInit } from "@angular/core";
import { AuthService } from "../Auth.service";
import { User } from "../../shared/user.model";
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  constructor(private AuthService: AuthService, private routes: Router) {}

  title: string;
  signUpForm: FormGroup;
  identicalPassword: string;
  user: User;

  success: boolean;
  message: string;
  class: string;
  loading: boolean;
  // strongRegexPassword = new RegExp(
  //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  // );

  mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
  );
  ngOnInit() {
    this.title = "sign up";
    this.success = false;
    this.message = "";
    this.init();
  }
  onSubmit() {
    this.loading = true;
    this.user = new User(this.signUpForm.value);
    this.AuthService.signUp(this.user).subscribe(
      data => {
        const data1 = data.json();
        if (data1.success) {
          this.class = "success";
          this.success = true;
          this.message = "you are ready to sign in";

          setTimeout(() => {
            this.routes.navigate(["/signin"]);
            this.loading = false;
          }, 2000);
        } else {
          this.class = "warning";
          this.success = false;
          this.message = "the email is already exist";
          this.loading = false;
        }
      },
      err => {
        this.success = false;
      }
    );
  }

  init() {
    this.signUpForm = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
        ])
      }),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.checkEmail.bind(this)
      ),
      Password: new FormGroup(
        {
          password: new FormControl(null, [
            Validators.required,
            Validators.pattern(this.mediumRegex)
          ]),
          confirmPassword: new FormControl(null, [Validators.required])
        },
        { validators: this.passwordConfirming }
      ),

      Birthday: new FormGroup({
        day: new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(31)
        ]),
        month: new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(12)
        ]),
        year: new FormControl(2018, [
          Validators.required,
          Validators.min(1940),
          Validators.max(2019)
        ])
      }),

      gender: new FormControl(null, [Validators.required])
    });

    this.signUpForm.patchValue({
      name: {
        firstName: "abdulfattah",
        lastName: "khudari"
      },
      email: "abdulfattah.khudari@gmail.com",
      Password: {
        password: "abdulfattah0952432706",
        confirmPassword: "abdulfattah0952432706"
      },
      Birthday: {
        day: 5,
        month: 5,
        year: 1995
      },
      gender: "male"
    });
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("password").value !== c.get("confirmPassword").value) {
      return { invalid: true };
    }
    return null;
  }

  checkEmail(control: FormControl) {
    const promise = new Promise((reslove, rejcet) => {
      this.AuthService.checkEmail(control.value).subscribe(response => {
        const RES = response.json();
        if (!RES.success) {
          reslove({ emailIsUsed: true });
        } else {
          reslove(null);
        }
      });
    });

    return promise;
  }
}
