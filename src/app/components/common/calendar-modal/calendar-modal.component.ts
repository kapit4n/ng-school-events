import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Announcement} from '../announcements.model';


@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class CalendarModalComponent implements OnInit {
  closeResult: string;
  inputsForm: FormGroup;
  titleField: string;
  startDateField: Date;
  durationField: number;
  announcement = new Announcement();
  @Output() passData: EventEmitter<Object> = new EventEmitter();

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
  }

  get today() {
    return new Date();
  }

  ngOnInit() {
    this.inputsForm = this.fb.group({
      titleField: [this.titleField, []],
      startDateField: [this.startDateField, []],
      durationField: [this.durationField, [Validators.required, this.checkDuration]]
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setValues() {
    console.log('Objeto');
    console.log(this.announcement);
    this.announcement.endDate = this.addDays(this.announcement.startDate, this.announcement.endDate)
    console.log(this.announcement);
    this.passData.emit(this.announcement);
    // this.passData.emit({titleField: this.titleField, startDateField: this.startDateField, durationField: this.durationField });
  }

  private addDays(date: any, days: number ): Date {
    const result = new Date( date );
    result.setDate(result.getDate() + days - 1 );
    return result;
  }

  // validations
  checkDuration(control: FormControl) {
    if (control.value > 0) {
      return {validDuration: false};
    } else {
      return {validDuration: true};
    }
  }
}
