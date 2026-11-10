import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUserInfo } from '../../feature/auth/models/users.interface';
import { Observable, tap } from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ApiRequests {
  private http = inject(HttpClient);
  private users = signal<IUserInfo[]>([])

  // სერვერიდან მგვაქვს იუზერები
  public getUsers(): Observable<IUserInfo[]> {
    return this.http.get<IUserInfo[]>(`${baseUrl}/users`).pipe(
      tap((users: IUserInfo[]) => {
        this.users.set(users);
      }
      )
    )
  }

  public login(): Observable<IUserInfo[]> {
    return this.getUsers();
  }

 public register(userInfo: IUserInfo): Observable<IUserInfo> {
  return this.http.post<IUserInfo>(`${baseUrl}/users`, userInfo);
}
}
