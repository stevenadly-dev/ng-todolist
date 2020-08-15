import { AuthServiceService } from "./../services/auth-service.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IsLoggedGuardGuard implements CanActivate {
  constructor(
    private AuthServiceService: AuthServiceService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.AuthServiceService.checkLocalStorage()) {
      // there is loacal storage data which is there is logged user
      this.router.navigateByUrl("/home");
      return false;
    } else {
      return true;
    }
  }
}
