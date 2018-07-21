import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { colors } from '../../../utilities/event-colors';
import {Subject} from 'rxjs';
import {CalendarManagementService} from '../calendar-management.service';
import {Announcement} from '../announcements.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-calendar-read-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-read-view.component.html',
  styleUrls: ['./calendar-read-view.component.css']
})
export class CalendarReadViewComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean;
  view: string = 'week';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  announcements: Announcement[];
  currentAnnouncement: Announcement = new Announcement();
  currentAction: string;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  colorEvent: any = colors.green;

  constructor(private cmService: CalendarManagementService, private modal: NgbModal) { }

  get today() {
    return new Date();
  }

  ngOnInit() {
    this.loadAnnouncements();
  }

  public loadAnnouncements() {
    this.cmService.loadAnnouncementsFromDB()
      .subscribe(
        (announcements: Announcement[]) => {
          this.cmService.setAnnouncements(announcements);
          this.announcements = this.cmService.getAnnouncements();
          for (let entry of announcements) {
            this.colorEvent = entry.id.startsWith('CF-') ? colors.yellow : colors.green ;
            this.events.push({
              id : entry.id,
              start: new Date(entry.startDate.toString()),
              end: new Date(entry.endDate.toString()),
              title: entry.title,
              color: this.colorEvent
            });
          }
          this.refresh.next();
        }
      );
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.currentAnnouncement = this.announcements.find( search => search.id === event.id.toString() );
    this.currentAction = action;
    if (this.currentAction === 'Clicked') {
      this.modal.open(this.modalContent);
    }
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

}
