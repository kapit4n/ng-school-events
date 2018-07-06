import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
// calendar imports
import { CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { colors } from '../../../utilities/event-colors';
import {Subject} from 'rxjs';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AnnsService } from "../../../services/anns.service";

@Component({
  selector: "app-ann-list-admin",
  templateUrl: "./ann-list-admin.component.html",
  styleUrls: ["./ann-list-admin.component.css"]
})
export class AnnListAdminComponent implements OnInit {
  newAnn: any;
  closeResult: string;
  searchText = "";
  annList: any;
  currentPage = 0;

  // calendar properties
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



  constructor(private modalService: NgbModal, private annsSvc: AnnsService) {
    this.newAnn = {};
    this.annList = [];
  }

  loadAnns() {
    this.annsSvc
      .getAnns(this.searchText, this.currentPage)
      .subscribe(anns => (this.annList = anns));
  }

  ngOnInit() {
    this.loadAnns();
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  search() {
    this.loadAnns();
  }

  saveAnn() {
    this.newAnn["year-schoolId"] = 1;
    this.newAnn["annType"] = "General";
    this.annsSvc.registerAnn(this.newAnn).subscribe(registered => {
      this.loadAnns();
    });
    this.newAnn = {};
  }

  deleteAnn(annId) {
    this.annsSvc.deleteAnn(annId).subscribe(ann => {
      this.loadAnns();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }


  //calendar methods
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
