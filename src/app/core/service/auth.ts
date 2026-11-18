import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiRequests } from './api-requests';
import { IUser, IUserInfo } from '../../feature/auth/models/users.interface';
import { map, Observable, switchMap, tap, throwError } from 'rxjs';

const STORAGE_KEY = 'brewly-user';

export type CurrentUser = Omit<IUserInfo, 'password'>;

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiService = inject(ApiRequests)
  private readonly _currentUser = signal<CurrentUser | null>(this.load());
  public readonly currentUser = this._currentUser.asReadonly();
  public readonly isAuthenticated = computed(() => this._currentUser() !== null);


  public login(user: IUser) {
    return this.apiService.login().pipe(
      map((usersInfo: IUserInfo[]) => {
        return usersInfo.find((usersInfo) => usersInfo.email === user.email && usersInfo.password === user.password);
      }),
      tap((found) => {
        if (found) {
          const { password, ...safeUser } = found;
          this._currentUser.set(safeUser);
          this.save(safeUser);
        }
      })
    )
  }

  public logout(): void {
    this._currentUser.set(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { }
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

  private load(): CurrentUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private save(user: CurrentUser): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch { }
  }
}
