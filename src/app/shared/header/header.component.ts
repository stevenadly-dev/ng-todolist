import { AuthServiceService } from "./../services/auth-service.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = false;
  isLoginned: boolean;
  authSubscription: Subscription;
  loggingOut: boolean;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  logout() {
    this.loggingOut = true;

    this.authService.logout().subscribe(
      (res) => {
        localStorage.removeItem("loginToken");
        localStorage.removeItem("currentuser");
        this.authService.authChange.next(null);
        this.router.navigate(["/login"]);

        console.log("res of logout", res);

        this.loggingOut = false;
      },
      (err) => {
        console.log("logout error", err.headers);
      }
    );
  }
  ngOnInit(): void {
    // debugger;
    this.checkLoginned();
    this.authSubscription = this.authService.authChange.subscribe((res) => {
      // debugger;
      this.isLoginned = res;
    });
    // this.checkLoginned();
  }

  checkLoginned() {
    // debugger;
    this.isLoginned = this.authService.checkLocalStorage();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
