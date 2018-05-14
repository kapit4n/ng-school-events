import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable()
export class StudentsService {
  constructor(private configSvc: ConfigurationService, private http: Http) {}

  public registerStudent(user: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/students", user).map(res => res.json());
  }

  public getStudents(): Observable<any> {
    return this.http
      .get("http://localhost:3000/api/students")
      .map(res => res.json());
  }
}
