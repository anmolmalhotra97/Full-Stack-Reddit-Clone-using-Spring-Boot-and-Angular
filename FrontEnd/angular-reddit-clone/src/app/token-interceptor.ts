import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { LoginResponse } from "./components/auth/login/login-response.payload";
import { AuthService } from "./services/auth/shared/auth.service";

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

    //boolean to check if token is refreshing
    isTokenRefreshing = false;

    //Acts as a Semaphore to block all out-going requests
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) {

    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.authService.getJwtToken();
        // if token is Valid add it to the request Header
        if (jwtToken) {
            this.addToken(request, jwtToken);
        }
        // if we receive and error response we need to prepare our client to make a refresh token call to the backend
        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 403) {
                return this.handleAuthErrors(request, next);
            } else {
                return throwError(error);
            }
        }));
    }

    // When we are making this call to refresh token
    // We have to temporarily block all the backend calls since they will be rejected because of invalid Token.
    handleAuthErrors(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);

                    return next.handle(this.addToken(request, refreshTokenResponse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(request, this.authService.getJwtToken()))
                })
            );
        }
    }

    addToken(request: HttpRequest<any>, jwtToken: any) {
        return request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + jwtToken)
        });
    }

}