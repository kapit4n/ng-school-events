import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { CalendarEvent} from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { colors } from '../../../utilities/event-colors';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-calendar-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean;
  view: string = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An event',
      color: colors.red
    }
  ];

  constructor() { }
  ngOnInit() {
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

  addAnnouncement(): void  {
    this.events.push({
      start: new Date(),
      title: 'An event',
      color: colors.red
    });
    this.refresh.next();
  }

}
