import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class SchoolYearsService {
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerSchoolYear(schoolYear: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/school-years", schoolYear)
      .map(res => res.json());
  }

  public getSchoolYears(filter = ""): Observable<any> {
    if (filter) {
      return this.http
        .get(this.configSvc.backendUrl + "/school-years?filter[where][year][regexp]=/" +
            filter + "/i")
        .map(res => res.json());

    } else {
      return this.http
        .get(this.configSvc.backendUrl + "/school-years")
        .map(res => res.json());

    }
  }

  public getSchoolYear(yearId): Observable<any> {
    return this.http .get(this.configSvc.backendUrl + "/school-years/" + yearId + "?filter[include]=courses").map(res => res.json());
  }
}
