import { Component, OnInit} from '@angular/core';

import { AnnsService } from '../../../services/anns.service';
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

  // loadAnns() {
  //   this.annsSvc
  //     .getAnns(this.searchText, this.currentPage)
  //     .subscribe(anns => (this.annList = anns));
  // }

  ngOnInit() {
    // this.loadAnns();
    this.announcements = this.cmService.getAnnouncements();
    this.cmService.announcementsChanged
      .subscribe(
        (announcements: Announcement[]) => {
          this.announcements = announcements;
        }
      );
  }

  getData(message: Announcement) {
    console.log(message.title);
    console.log(message.startDate);
    console.log(message.endDate);
    console.log(message);
    this.cmService.addAnnouncement(message);
  }

  private addDays(date: any, days: number ): Date {
    const result = new Date( date );
    result.setDate(result.getDate() + days - 1 );
    return result;
  }

  // saveAnn() {
  //   this.newAnn['year-schoolId'] = 1;
  //   this.newAnn['annType'] = 'General';
  //   this.annsSvc.registerAnn(this.newAnn).subscribe(registered => {
  //     this.loadAnns();
  //   });
  //   this.newAnn = {};
  // }

}
