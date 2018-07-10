import {EventEmitter, Injectable} from '@angular/core';
import {Announcement} from './announcements.model';

import { ConfigurationService } from '../../services/configuration.service';
import { HttpClientService } from '../../services/http-client.service';
// import {Observable} from '../../../../node_modules/rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class CalendarManagementService {
  announcementsChanged = new EventEmitter<Announcement[]>();
  private announcements: Announcement[] = [
    new Announcement('new Announcement 1', new Date(), new Date()),
    new Announcement('new Announcement 2', new Date(), new Date()),
    new Announcement('new Announcement 3', new Date(), new Date())
  ];

  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  getAnnouncements() {
    return this.announcements.slice();
  }

  addAnnouncement(announcement: Announcement) {
    console.log(announcement);
    this.announcements.push(announcement);
    this.announcementsChanged.emit(this.announcements.slice());
    this.registerAnnouncement(announcement);
  }

  registerAnnouncement(announcement: Announcement): void {
    console.log('post comand');
    console.log(announcement);
    this.http
      .post(this.configSvc.backendUrl + '/announcement2s', announcement)
      .map(res => res.json());
  }
}

