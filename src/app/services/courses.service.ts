import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable()
export class CoursesService {

  constructor(private configSvc: ConfigurationService, private http: HttpClientService) { }


  public registerCourse(course: any): Observable<any> {
    return this.http.post(this.configSvc.backendUrl + "/courses", course).map(res => res.json());
  }

  public getCourses(): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/courses").map(res=> res.json());
  }
}
