import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  public userForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.email]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  }
    , { validators: passwordMatchValidator });

  public login() {

  }

  public get fullNameControl(): FormControl {
    return this.userForm.get('fullName') as FormControl;
  }

  public get emailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.userForm.get('password') as FormControl;
  }

  public get confirmPasswordControl(): FormControl {
    return this.userForm.get('confirmPassword') as FormControl;
  }
}

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }

  return null;
}