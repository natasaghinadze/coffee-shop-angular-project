import { inject, Injectable } from '@angular/core';
import { ApiRequests } from './api-requests';
import { IUser, IUserInfo } from '../../feature/auth/models/users.interface';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiService = inject(ApiRequests)
  private route = inject(Router)

  public login(user: IUser) {
    this.apiService.login().pipe(
      tap((usersInfo: IUserInfo[]) =>{
        const foundUser = usersInfo.find((usersInfo) => usersInfo.email === user.email && usersInfo.password === user.password);
        // if(foundUser){
        //   this.route.navigate()
        // }
      }),
    ).subscribe();
  }

  public register() {

  }
}
