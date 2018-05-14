import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private configSvc: ConfigurationService, private http: Http) {
    
  }

  public registerTeacher(user: any): Observable<any> {
    return this.http.post(this.configSvc.backendUrl + "/users", user).map(res => res.json());
  }

  public getTeachers(): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/users")
      .map(res => res.json());
  }
}
