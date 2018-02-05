import {
    FormGroup,
    FormBuilder,
    FormControl,
    ValidatorFn,
    AsyncValidatorFn,
    Validators
} from '@angular/forms';
export class FormController {
    constructor(
        private builder:FormBuilder,
        private name: string
    ) { }
    control(name:string, state?:any, validators?:ValidatorFn[]|ValidatorFn, asyncValidators?:AsyncValidatorFn[]|AsyncValidatorFn) {
        this.group.addControl(name, new FormControl(state, validators, asyncValidators));
        return this;
    }
    public group: FormGroup = this.builder.group({});
    static control(formControl:FormController, name:string, state?:any, validators?:ValidatorFn[]|ValidatorFn, asyncValidators?:AsyncValidatorFn[]|AsyncValidatorFn) {
        return formControl.control(name, state, validators, asyncValidators);
    }
}
export {
    FormGroup,
    FormBuilder,
    FormControl,
    ValidatorFn,
    AsyncValidatorFn,
    Validators
};