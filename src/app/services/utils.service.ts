import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService) { }

  public getCurrentSchoolYear(): Observable<any[]> {
    return this.http
      .get(this.configSvc.backendUrl + "/school-years?filter[where][isCurrent]=true")
      .map(res => res.json());
  }
}
