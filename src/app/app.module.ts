import { AuthGuardGuard } from "./shared/guards/auth-guard.guard";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterationComponent } from "./auth/registeration/registeration.component";
import { TodosHomeComponent } from "./todos/todos-home/todos-home.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";

import { NgbModule, NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { SearchPipe, CompletedNotCompletedPipe } from "./shared/pipes";
import { AddTaskComponent } from "./todos/add-task/add-task.component";
import { CompleteOrNotFiltersComponent } from "./todos/complete-or-not-filters/complete-or-not-filters.component";
import { SearchComponent } from "./todos/search/search.component";

import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterationComponent,
    TodosHomeComponent,
    HeaderComponent,
    FooterComponent,
    SearchPipe,
    CompletedNotCompletedPipe,
    AddTaskComponent,
    CompleteOrNotFiltersComponent,
    SearchComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    NgbCollapseModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
