import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class FollowUpsService {
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerFollowUp(followUp: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/follow-ups", followUp)
      .map(res => res);
  }
}
