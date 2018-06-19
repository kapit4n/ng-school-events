import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class ParentsService {
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerParent(user: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/users", user)
      .map(res => res);
  }

  public registerParentInfo(parentInfo: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/parents", parentInfo)
      .map(res => res.json());
  }

  public updateParentInfo(parentInfo: any): Observable<any> {
    return this.http
      .put(this.configSvc.backendUrl + "/parents/" + parentInfo.id, parentInfo)
      .map(res => res.json());
  }

  public getParents(): Observable<any> {
    return this.http
      .get(
        this.configSvc.backendUrl +
          "/users?filter[include]=parents&filter[where][userType]=parent"
      )
      .map(res => res.json());
  }

  public getParentByUserId(id: string): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/parents?filter[where][userId]=" + id)
      .map(res => res.json());
  }

    public getParent(parentId): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/parents/" + parentId + "")
      .map(res => res.json());
  }

  public getStudents(parentId = ""): Observable<any> {
    return this.http
      .get(
        this.configSvc.backendUrl +
          "/student-parents?filter[include]=student&filter[where][parentId]=" + parentId
      )
      .map(res => res.json());
  }
}
