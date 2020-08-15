import { authModel } from "./../../shared/models/auth.model";
import { AuthServiceService } from "./../../shared/services/auth-service.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  // nenoadlyc2@gmail.com
  // showmcyr11
  loginForm: FormGroup;
  showLoginError: string;
  isLoadinglogin: boolean;
  loginSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      ],
      password: [
        "",
        [
          // Validators.pattern(
          // "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])$"
          // "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"

          //
          // RegEx	Description
          // ^	The password string will start this way
          // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
          // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
          // (?=.*[0-9])	The string must contain at least 1 numeric character
          // (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
          // (?=.{8,})	The string must be eight characters or longer
          // ),
          Validators.required,
          Validators.minLength(8),
        ],
      ],
    });
    this.isLoadinglogin = false;
  }

  loginSubmit() {
    this.isLoadinglogin = true;

    debugger;
    this.loginSubscription = this.authService
      .login(this.loginForm.value)
      .subscribe(
        (res: any) => {
          localStorage.setItem("loginToken", res.token);
          localStorage.setItem("currentuser", JSON.stringify(res.user));
          this.router.navigate(["todos"]);
          console.log("login res", res);
          // debugger;
          // this.authService.authChange.next(true);
        },
        (err) => {
          this.showLoginError = err.error;
          console.log("login error", err.error);
        }
      );

    this.isLoadinglogin = false;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
