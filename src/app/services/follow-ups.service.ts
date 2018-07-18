import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class FollowUpsService {
  endPoint = "follow-ups";
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerFollowUp(followUp: any): Observable<any> {
    return this.http
      .post(`this.configSvc.backendUrl/${this.endPoint}`, followUp)
      .map(res => res);
  }

  public getFollowUps(filter = "", limit = 100, skip = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.endPoint
          }?filter[limit]=${limit}&filter[skip]=${skip}&filter[where][year][regexp]=/${filter}/i`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.endPoint
          }?filter[limit]=${limit}&filter[skip]=${skip}`
        )
        .map(res => res.json());
    }
  }
}
