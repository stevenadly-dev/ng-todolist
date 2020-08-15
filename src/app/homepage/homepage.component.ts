import { AuthServiceService } from "./../shared/services/auth-service.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  constructor(
    private AuthServiceService: AuthServiceService,
    private router: Router
  ) {}

  getStarted() {
    if (this.AuthServiceService.checkLocalStorage()) {
      this.router.navigateByUrl("/todos");
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  ngOnInit(): void {}
}
