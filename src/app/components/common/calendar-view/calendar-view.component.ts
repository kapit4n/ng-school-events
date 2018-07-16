import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
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
  currentAnnoucement: Announcement = new Announcement();
  currentAction: string;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  constructor(private cmService: CalendarManagementService, private modal: NgbModal ) {}

  ngOnInit() {
    this.announcements = this.cmService.getAnnouncements();
    this.loadAnnouncements();
    // CRITICAL CHANGE
    this.cmService.announcementsChanged
      .subscribe(
        (announcement: Announcement) => {
          this.announcements.push(announcement);
          this.events.push({
            id: announcement.id,
            start: announcement.startDate,
            end: announcement.endDate,
            title: announcement.title,
            color: colors.red,
            actions: this.actions
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
              id : entry.id,
              start: new Date(entry.startDate.toString()),
              end: new Date(entry.endDate.toString()),
              title: entry.title,
              color: colors.red,
              actions: this.actions
            });
          }
          this.refresh.next();
        }
      );
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    this.currentAnnoucement = this.announcements.find( search => search.id === event.id.toString() );
    this.currentAction = action;
    //console.log(event);
    if (this.currentAction === 'Deleted') {
      this.modal.open(this.modalContent, {size: 'sm'});
    } else {
      this.modal.open(this.modalContent, {size: 'lg'});
    }

  }
}
