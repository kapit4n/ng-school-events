import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable()
export class StudentsService {
  constructor(private configSvc: ConfigurationService, private http: HttpClient) {
    
  }

  public registerStudent(user: any): Observable<any> {
    return this.http.post(this.configSvc.backendUrl + "/students", user);
  }

  public getStudents(): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/students");
  }
}
