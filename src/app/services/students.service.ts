import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable()
export class StudentsService {
  constructor(private configSvc: ConfigurationService, private http: HttpClientService) {
    
  }

  public registerStudent(user: any): Observable<any> {
    return this.http.post(this.configSvc.backendUrl + "/students", user).map(res => res.json());
  }

  public getStudents(): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/students").map(res=> res.json());
  }

  public getStudent(studentId): Observable<any> {
    return this.http.get(this.configSvc.backendUrl + "/students/" + studentId + "").map(res => res.json());
  }

  public getCourses(studentId = ""): Observable<any> {
    return this.http
      .get(
        this.configSvc.backendUrl +
          "/course-students?filter[include]=course&filter[include]=student"
      )
      .map(res => res.json());
  }
}
