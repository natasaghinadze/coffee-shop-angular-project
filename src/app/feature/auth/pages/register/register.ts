import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from './validator';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  public userForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.email]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwordGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, [passwordMatchValidator])
  }
);

  public login() {

  }

  public get fullNameControl(): FormControl {
    return this.userForm.get('fullName') as FormControl;
  }

  public get emailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.userForm.controls.passwordGroup.get('password') as FormControl;
  }

  public get confirmPasswordControl(): FormControl {
    return this.userForm.controls.passwordGroup.get('confirmPassword') as FormControl;
  }
}