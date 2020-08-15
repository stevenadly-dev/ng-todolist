import { Router } from "@angular/router";
import { AuthServiceService } from "./../../shared/services/auth-service.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { nameValidator } from "src/app/shared/validators/name.validor";
import { error } from "protractor";
import { Subscription } from "rxjs";

@Component({
  selector: "app-registeration",
  templateUrl: "./registeration.component.html",
  styleUrls: ["./registeration.component.scss"],
})
export class RegisterationComponent implements OnInit {
  registerationForm: FormGroup;
  isLoadingReg: boolean;
  regesterationSub: Subscription;
  constructor(
    private fb: FormBuilder,
    private authSerivce: AuthServiceService,
    private route: Router
  ) {
    this.isLoadingReg = false;

    this.registerationForm = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          // Validators.pattern("^[A-Z][a-z]*$"),
          nameValidator,
        ],
      ],
      email: [
        "",
        [
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(8)]],
      age: [
        "",
        [
          Validators.pattern("^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$"),
          Validators.required,
        ],
      ],
    });

    this.registerationForm.valueChanges.subscribe((formParm) => {
      if (isNaN(formParm.age)) {
        this.registerationForm.patchValue(
          {
            age: formParm.age.replace(/[a-zA-z]/g, ""),
          },
          {
            emitEvent: false,
          }
        );
      } else if (+formParm.age < 1) {
        this.registerationForm.patchValue(
          {
            age: formParm.age.replace(1),
          },
          {
            emitEvent: false,
          }
        );
      }
    });
  }

  get Uname() {
    return this.registerationForm.get("name");
  }
  get Uemail() {
    return this.registerationForm.get("email");
  }
  get Upassword() {
    return this.registerationForm.get("password");
  }
  get Uage() {
    return this.registerationForm.get("age");
  }

  submitFn() {
    this.isLoadingReg = true;
    this.regesterationSub = this.authSerivce
      .registeration(this.registerationForm.value)
      .subscribe(
        (res: any) => {
          this.isLoadingReg = false;
          console.log("res----", res);
          localStorage.setItem("uToken", res.token);
          this.route.navigateByUrl("/login");
        },
        (error: Error) => {
          console.log("post error", error);
        }
      );
    console.log("submit fn");
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.regesterationSub?.unsubscribe();
  }
}
