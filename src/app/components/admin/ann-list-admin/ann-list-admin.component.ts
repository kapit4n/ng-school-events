import { Component, OnInit} from '@angular/core';

import {CalendarManagementService} from '../../common/calendar-management.service';
import {Announcement} from '../../common/announcements.model';

@Component({
  selector: 'app-ann-list-admin',
  templateUrl: './ann-list-admin.component.html',
  styleUrls: ['./ann-list-admin.component.css'],
  providers: [CalendarManagementService]
})
export class AnnListAdminComponent implements OnInit {
  announcements: Announcement[];
  announcement = new Announcement();

  constructor(private cmService: CalendarManagementService) {
  }

  ngOnInit() {
    this.announcements = this.cmService.getAnnouncements();
    this.cmService.announcementsChanged
      .subscribe(
        (announcements: Announcement[]) => {
          this.announcements = announcements;
        }
      );
  }

  getData(message: Announcement) {

    this.cmService.addAnnouncement(message).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    ); // aqui agregare un subscribe para consolidar el http request y  registrar/recargar lista y limpiar el popup
  }

  private addDays(date: any, days: number ): Date {
    const result = new Date( date );
    result.setDate(result.getDate() + days - 1 );
    return result;
  }


}
