import { inject, Injectable } from '@angular/core';
import { ApiRequests } from './api-requests';
import { IUser, IUserInfo } from '../../feature/auth/models/users.interface';
import { map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiService = inject(ApiRequests)

  public login(user: IUser) {
    return this.apiService.login().pipe(
      map((usersInfo: IUserInfo[]) => {
        return usersInfo.find((usersInfo) => usersInfo.email === user.email && usersInfo.password === user.password);
      })
    )
  }

  public register(userInfo: IUserInfo): Observable<IUserInfo> {
    return this.apiService.getUsers().pipe(
      switchMap((users: IUserInfo[]) => {
        const existingUser = users.find((user) => user.email.trim().toLocaleLowerCase() === userInfo.email.trim().toLocaleLowerCase());
        if (existingUser) {
          return throwError(() => new Error('User already exists'));
        }
        return this.apiService.register(userInfo);
      })
    )
  }
}
