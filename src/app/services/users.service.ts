import { Injectable } from '@angular/core';
import { HttpClientService } from "./http-client.service";
import { ConfigurationService } from "./configuration.service";
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable()
export class UsersService {
  constructor(private configSvc: ConfigurationService, private authSvc: AuthService, private http: HttpClientService) {
  }

  public getCurrentUser(): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/users/" + this.authSvc.getCurrentUserId())
      .map(res => res.json());
  }
  public registerAdmin(user: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/users", user)
      .map(res => res.json());
  }

  public getCurrentUserId(): string {
    return this.authSvc.getCurrentUserId();
  }

  public getUserById(id: string): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/users/" + id)
      .map(res => res.json());
  }
}
