import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import { CalendarEvent} from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { colors } from '../../../utilities/event-colors';
import {Subject} from 'rxjs';
import {CalendarManagementService} from '../calendar-management.service';
import {Announcement} from '../announcements.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean;
  view: string = 'week';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  announcements: Announcement[];
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  constructor(private cmService: CalendarManagementService, private modal: NgbModal ) {}

  ngOnInit() {
    this.announcements = this.cmService.getAnnouncements();
    this.loadAnnouncements();
    this.cmService.announcementsChanged
      .subscribe(
        (announcements: Announcement[]) => {
          this.announcements = announcements;
          this.events.push({
            start: announcements[announcements.length - 1].startDate,
            end: announcements[announcements.length - 1].endDate,
            title: announcements[announcements.length - 1].title,
            color: colors.red
          });
          this.refresh.next();
        }
      );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  public loadAnnouncements() {
    this.cmService.loadAnnouncementsFromDB()
      .subscribe(
        (announcements: Announcement[]) => {
          this.announcements = announcements;
          for (let entry of announcements) {
            this.events.push({
              start: new Date(entry.startDate.toString()),
              end: new Date(entry.endDate.toString()),
              title: entry.title,
              color: colors.red
            });
          }
          this.refresh.next();
        }
      );
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
}
