import { AuthGuardGuard } from "./shared/guards/auth-guard.guard";
import { TodosHomeComponent } from "./todos/todos-home/todos-home.component";
import { RegisterationComponent } from "./auth/registeration/registeration.component";
import { LoginComponent } from "./auth/login/login.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IsLoggedGuardGuard } from "./shared/guards/is-logged-guard.guard";

const routes: Routes = [
  { path: "", component: HomepageComponent, pathMatch: "full" },
  { path: "home", component: HomepageComponent },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [IsLoggedGuardGuard],
  },
  {
    path: "registeration",
    component: RegisterationComponent,
    canActivate: [IsLoggedGuardGuard],
  },
  {
    path: "todos",
    component: TodosHomeComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
