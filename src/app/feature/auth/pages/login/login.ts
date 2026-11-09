import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';
import { Auth } from '../../../../core/service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(Auth)
  private router = inject(Router)

  public userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  public login() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.authService.login({
      email: this.emailControl.value,
      password: this.passwordControl.value
    }).subscribe({
      next: (foundUser) => {
        if (foundUser) {
          this.router.navigate(['/home']);
        } else {
          console.log('Invalid email or password');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  public get emailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.userForm.get('password') as FormControl;
  }
}
