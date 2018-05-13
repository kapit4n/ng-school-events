import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable()
export class StudentsService {

  constructor(private configSvc: ConfigurationService, private http: Http) {
  }

  public resgisterUser(user: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/student", user);
  }

}
