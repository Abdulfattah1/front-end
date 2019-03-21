import { Component, OnInit } from "@angular/core";
import { validator } from "./validator.directive";
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-test",
  template: `
  `,
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  constructor() {}

  onScroll() {
    console.log('scrolled!!');
  }

  onScrollUp() {
    console.log('scrolled up!!');
  }

  formGroup: FormGroup;
  validationArray;
  rules;
  validationField;
  ngOnInit() {
    this.rules = {
      isRequired: 1,
      minSize: 1,
      maxSize: 10
    };

    this.validationField = {
      0: {
        image: 1,
        justification: 1
      },
      1: {
        image: 0,
        justification: 0
      }
    };
    this.validationArray = [this.validationField, this.rules];
    console.log(this.validationArray);
    this.formGroup = new FormGroup({
      mainField_1: new FormControl(null, [Validators.required]),
      imageField_1: new FormControl(null),
      justificationField_1: new FormControl(null),
      mainField_2: new FormControl(null, [Validators.required]),
      imageField_2: new FormControl(null),
      justificationField_2: new FormControl(null)
    });

    for (var i = 1; i <= 2; i++) {
      const Validator = new validator();
      Validator.rules = this.rules;
      Validator.validationField = this.validationField;
      Validator.mainField = this.formGroup.get("mainField" + "_" + i);
      Validator.imageField = this.formGroup.get("imageField" + "_" + i);
      Validator.justification = this.formGroup.get(
        "justificationField" + "_" + i
      );

      Validator.validate();
    }

    /*this.validation(
      this.formGroup.get("mainField"),
      this.formGroup.get("imageField"),
      this.formGroup.get("justificationField"),
      this.validationField
    );*/
  }

  onsubmit() {
    console.log(this.formGroup);
  }

  validation(
    mainField: AbstractControl,
    imageField: AbstractControl,
    justification: AbstractControl,
    validationField
  ) {
    if (validationField[0].image == 0) {
      imageField.setValidators([Validators.required]);
    }
    if (validationField[0].justification == 0) {
      justification.setValidators([Validators.required]);
    }

    mainField.valueChanges.subscribe(value => {
      if (value == "") {
        if (validationField[0].image == 0) {
          imageField.setValidators([Validators.required]);
        } else if (validationField[0].image == 1) {
          imageField.setValidators(null);
        }
        if (validationField[0].justification == 0) {
          justification.setValidators([Validators.required]);
        } else if (validationField[0].justification == 1) {
          justification.setValidators([null]);
        }
      } else {
        if (validationField[1].image == 0) {
          imageField.setValidators([Validators.required]);
        } else if (validationField[1].image == 1) {
          imageField.setValidators(null);
        }
        if (validationField[1].justification == 0) {
          justification.setValidators([Validators.required]);
        } else if (validationField[1].justification == 1) {
          justification.setValidators(null);
        }
      }
      imageField.updateValueAndValidity();
      justification.updateValueAndValidity();
    });
  }
}
