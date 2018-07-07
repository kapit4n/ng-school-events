import {EventEmitter, Injectable} from '@angular/core';
import {Announcement} from './announcements.model';

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

  constructor() { }

  getAnnouncements() {
    return this.announcements.slice();
  }

  addAnnouncement(announcement: Announcement) {
    console.log(announcement);
    this.announcements.push(announcement);
    this.announcementsChanged.emit(this.announcements.slice());
  }
}

