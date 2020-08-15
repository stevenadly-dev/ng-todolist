import { ValidatorFn, AbstractControl } from "@angular/forms";

export function nameValidator(control: AbstractControl) {
  console.log("in validate name ", control);
  if (control.value.match(/[0-9]/g)) {
    // debugger;
    // console.log('');
    return {
      haveNumbers: true,
    };
  } else {
    return null;
  }

  // return(control: AbstractControl): ValidationErrors | null;
}
