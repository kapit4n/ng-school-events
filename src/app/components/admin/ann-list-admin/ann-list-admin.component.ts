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
    // this.cmService.announcementsChanged
    //   .subscribe(
    //     (announcements: Announcement[]) => {
    //       this.announcements = announcements;
    //     }
    //   );
  }

  getData(message: Announcement) {
    this.cmService.addAnnouncement(message).subscribe(
    (response) => {
      console.log(response);
      this.cmService.updateSingleAnnouncement(message, 'Insert');
    },
      (error) => console.log(error)
  );
  }

  private addDays(date: any, days: number ): Date {
    const result = new Date( date );
    result.setDate(result.getDate() + days - 1 );
    return result;
  }


}
