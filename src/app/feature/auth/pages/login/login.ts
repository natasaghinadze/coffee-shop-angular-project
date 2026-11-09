import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  public login(){

  }

  public get emailControl(): FormControl{
    return this.userForm.get('email') as FormControl;
  }

  public get passwordControl(): FormControl{
    return this.userForm.get('password') as FormControl;
  }
}
