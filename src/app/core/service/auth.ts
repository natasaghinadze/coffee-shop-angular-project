import { inject, Injectable } from '@angular/core';
import { ApiRequests } from './api-requests';
import { IUser, IUserInfo } from '../../feature/auth/models/users.interface';
import { map} from 'rxjs';

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

  public register() {

  }
}
