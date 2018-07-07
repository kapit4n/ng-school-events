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
  newAnn: any;
  annList: any;
  announcements: Announcement[];

  constructor(private annsSvc: AnnsService, private cmService: CalendarManagementService) {
    this.newAnn = {};
    this.annList = [];
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

  getData(message: any) {
    console.log(message.titleField);
    console.log(message.startDateField);
    console.log(message.durationField);
    this.cmService.addAnnouncement(new Announcement(
      message.titleField,
      message.startDateField,
      this.addDays(message.startDateField, message.durationField)
    ));
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
