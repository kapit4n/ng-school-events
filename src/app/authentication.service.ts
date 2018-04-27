import { Injectable } from '@angular/core';
import { AuthService } from 'ngx-auth';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { Http } from "@angular/http";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(private http: Http) {}

  public isAuthorized(): Observable<boolean> {
    const isAuthorized: boolean = !!localStorage.getItem('accessToken');

    return Observable.of(isAuthorized);
  }

  public getAccessToken(): Observable<string> {
    const accessToken: string = localStorage.getItem('accessToken');

    return Observable.of(accessToken);
  }

  public refreshToken(): Observable<any> {
    const refreshToken: string = localStorage.getItem('refreshToken');

    return this.http
      .post('http://localhost:3001/refresh-token', { refreshToken })
      .catch(() => this.logout())
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('refresh-token');
  }

}