import { userModel, authModel } from "./../models";
import { Injectable } from "@angular/core";
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  myheaderOpt: HttpHeaders;
  logoutHeader: HttpHeaders;
  authChange = new Subject<boolean>();
  isLoginned: boolean;

  constructor(private http: HttpClient) {
    this.myheaderOpt = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
  }

  registeration(myForm: userModel) {
    // const body = JSON.stringify(myForm);
    // debugger;
    return this.http.post<any>(
      "https://api-nodejs-todolist.herokuapp.com/user/register",
      myForm,
      { headers: this.myheaderOpt }
    );
  }

  login(loginForm: authModel) {
    return this.http
      .post("https://api-nodejs-todolist.herokuapp.com/user/login", loginForm, {
        headers: this.myheaderOpt,
      })
      .pipe(
        map((user) => {
          this.authChange.next(true);
          return user;
        })
      );
  }

  logout() {
    this.logoutHeader = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("loginToken")
    );

    return this.http.post<any>(
      "https://api-nodejs-todolist.herokuapp.com/user/logout",
      "",
      { headers: this.logoutHeader }
    );
  }

  checkLocalStorage() {
    if (localStorage.getItem("loginToken")) {
      return true;
      // this.isLoginned = true;
    } else {
      return false;
    }
  }
}
