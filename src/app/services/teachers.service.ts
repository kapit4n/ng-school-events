import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private configSvc: ConfigurationService, private http: HttpClient) {
    
  }

  public registerTeacher(user: any): Observable<any> {
    return this.http.post(this.configSvc.backendUrl + "/users", user);
  }

  public getTeachers(): Observable<any> {
    return this.http
      .get(
        this.configSvc.backendUrl + "/users?filter[where][userType]=teacher"
      );
  }
}
