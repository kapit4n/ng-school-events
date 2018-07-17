import {EventEmitter, Injectable} from '@angular/core';
import {Announcement} from './announcements.model';

import { ConfigurationService } from '../../services/configuration.service';
import { HttpClientService } from '../../services/http-client.service';
import {Observable} from '../../../../node_modules/rxjs/Rx';
// import {Observable} from '../../../../node_modules/rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class CalendarManagementService {
  announcementsChanged = new EventEmitter<Announcement[]>();
  announcementsUpserted = new EventEmitter<Announcement[]>();
  announcementsDeleted = new EventEmitter<Announcement[]>();
  private announcements: Announcement[] = [];

  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  getAnnouncements() {
    return this.announcements.slice();
  }

  public loadAnnouncementsFromDB(): Observable<any>  {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/announcement2s`
      )
      .map(res => res.json())
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }

  addAnnouncement(announcement: any): Observable<any> {
    this.announcements.push(announcement);
    // CRITICAL CHANGE
    this.announcementsChanged.emit(announcement);
    return this.http
      .post(this.configSvc.backendUrl + '/announcement2s', announcement)
      .map(res => res.json())
      .catch(
        (error: Response) => {
          return Observable.throw(`Something went wrong with adding announcement records:${announcement.toString()}`);
        }
      );
    //this.registerAnnouncement(announcement);
  }

  registerAnnouncement(announcement: Announcement): void {
    console.log('post comand');
    console.log(announcement);
    this.http
      .post(this.configSvc.backendUrl + '/announcement2s', announcement)
      .map(res => res.json());
  }

  // EDIT STUFF
  upsertAnnouncement(announcement: any): Observable<any> {
    this.announcements.push(announcement);
    // CRITICAL CHANGE
    this.announcementsUpserted.emit(announcement);
    return this.http
      .put(`${this.configSvc.backendUrl}/announcement2s/${announcement.id}`, announcement)
      .map(res => res.json())
      .catch(
        (error: Response) => {
          return Observable.throw(`Something went wrong with updating the announcement record:${announcement.toString()}`);
        }
      );
  }

  // EDIT STUFF
  deleteAnnouncement(announcement: any): Observable<any> {
    this.announcements.push(announcement);
    // CRITICAL CHANGE
    this.announcementsDeleted.emit(announcement);
    return this.http
      .delete(this.configSvc.backendUrl + "/announcement2s/" + announcement.id)
      .map(res => res.json())
      .catch(
        (error: Response) => {
          return Observable.throw(`Something went wrong with deleting the announcement:${announcement.toString()}`);
        }
      );
  }
}

