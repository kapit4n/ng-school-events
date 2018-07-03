import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class ParentsService {

  parentUrl = "parents";
  userUrl = "users";
  sParentUrl = "student-parents";
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerParent(user: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.userUrl}`, user)
      .map(res => res);
  }

  public registerParentInfo(parentInfo: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.parentUrl}`, parentInfo)
      .map(res => res.json());
  }

  public updateParentInfo(parentInfo: any): Observable<any> {
    return this.http
      .put(`${this.configSvc.backendUrl}/${this.parentUrl}/${parentInfo.id}`, parentInfo)
      .map(res => res.json());
  }

  public getParents(): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${this.userUrl}?filter[include]=parents&filter[where][userType]=parent`
      )
      .map(res => res.json());
  }

  public getParentsCount(): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${this.userUrl}/count?where[userType]=parent`
      )
      .map(res => res.json());
  }

  public getSons(): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${this.sParentUrl}?filter[include]=parent&filter[include]=student`
      )
      .map(res => res.json());
  }

  public getParentByUserId(id: string): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/${this.parentUrl}?filter[where][userId]=${id}`)
      .map(res => res.json());
  }

  public getParent(parentId): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/${this.parentUrl}/${parentId}`)
      .map(res => res.json());
  }


  public getStudents(parentId = ""): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${this.sParentUrl}?filter[include]=student&filter[where][parentId]=${parentId}`
      )
      .map(res => res.json());
  }

  public getStudent(studentId = ""): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${this.sParentUrl}?filter[include]=student&filter[where][id]=${studentId}`
      )
      .map(res => res.json());
  }


}
