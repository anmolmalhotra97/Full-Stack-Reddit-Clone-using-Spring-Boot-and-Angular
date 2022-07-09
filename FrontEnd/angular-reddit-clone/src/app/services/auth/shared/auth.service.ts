import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignupRequestPayload } from 'src/app/components/auth/signup/singup-request.payload';
import { LoginRequestPayload } from 'src/app/components/auth/login/login-request.payload';
import { LoginResponse } from 'src/app/components/auth/login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(
    private httpClient: HttpClient,
    private browserLocalStorage: LocalStorageService
  ) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.browserLocalStorage.store('authenticationToken', data.authenticationToken);
        this.browserLocalStorage.store('username', data.username);
        this.browserLocalStorage.store('refreshToken', data.refreshToken);
        this.browserLocalStorage.store('expiresAt', data.expiresAt)

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
  }

  getJwtToken() {
    return this.browserLocalStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token', refreshTokenPayload)
      .pipe(tap(response => {
        this.browserLocalStorage.store('authenticationToken', response.authenticationToken);
        this.browserLocalStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getRefreshToken() {
    return this.browserLocalStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.browserLocalStorage.retrieve('username');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, { responseType: 'text' })
      .subscribe(response => {
        console.log(response);
      }, error => {
        throwError(error);
      })

    this.browserLocalStorage.clear('authenticationToken');
    this.browserLocalStorage.clear('username');
    this.browserLocalStorage.clear('refreshToken');
    this.browserLocalStorage.clear('expiresAt');
  }

}
