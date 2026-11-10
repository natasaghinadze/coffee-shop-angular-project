import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from './validator';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';
import { Router } from '@angular/router';
import { Auth } from '../../../../core/service/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(Auth)
  private router = inject(Router)


  public userForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwordGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, [passwordMatchValidator])
  }
  );

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

  public register() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.authService.register({
      fullName: this.fullNameControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value
    }).subscribe({
      next: (user) => {
        console.log('User registered:', user);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }

}