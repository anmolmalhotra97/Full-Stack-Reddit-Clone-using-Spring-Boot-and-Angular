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


        if (request.url.indexOf('refresh') !== -1 || request.url.indexOf('login') !== -1) {
            return next.handle(request);
        }

        // if token is Valid add it to the request Header
        const jwtToken = this.authService.getJwtToken();

        if (jwtToken) {
            // if we receive and error response we need to prepare our client to make a refresh token call to the backend
            return next.handle(this.addToken(request, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse
                    && (error.status === 401 || error.status === 403)) {
                    return this.handleAuthErrors(request, next);
                } else {
                    return throwError(error);
                }
            }));
        }
        return next.handle(request);
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
        }
        // this else is introduced because when there are multiple requests and token is expired
        // the first request will fail and request token but the other requests will fail SILENTLY.
        // 1. we filter the result until we get a success response
        // 2. We take the 1st req in the behavior subject, take the new token and use it to make the request
        else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(request, this.authService.getJwtToken()))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: string) {
        return req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + jwtToken
            }
        });
    }

}