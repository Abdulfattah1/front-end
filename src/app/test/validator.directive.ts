import { Directive } from "@angular/core";
import { AbstractControl, Validators, ValidationErrors } from "@angular/forms";

@Directive({
  selector: "[validator]"
})
export class validator {
  rules: [];
  validationField;
  errors = [];
  mainField: AbstractControl;
  imageField: AbstractControl;
  justification: AbstractControl;

  validate() {
    console.log("aa");
    if (this.mainField.value === "" || !this.mainField.value) {
      this.errors.push("this field is required");
    }
    this.mainField.valueChanges.subscribe(value => {
      console.log(value);
      if (value === "") {
        this.imageField.setValidators(Validators.required);
        this.justification.clearValidators();
      } else if (value != "") {
        this.imageField.clearValidators();
        this.justification.setValidators(Validators.required);
      }
      this.imageField.updateValueAndValidity();
      this.justification.updateValueAndValidity();
    });
  }
}
