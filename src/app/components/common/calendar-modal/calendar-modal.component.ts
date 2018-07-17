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
  title: string;
  description: string;
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
      title: ['', [Validators.required]],
      description: [''],
      startDateField: ['', [Validators.required]],
      durationField: ['', [Validators.required, this.checkDuration]]
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
    this.announcement.id = this.generateId();
    this.announcement.title = this.inputsForm.get('title').value;
    this.announcement.description = this.inputsForm.get('description').value;
    this.announcement.startDate = this.inputsForm.get('startDateField').value;
    this.announcement.endDate = this.inputsForm.get('durationField').value;
    this.announcement.endDate = this.addDays(this.announcement.startDate, this.announcement.endDate);
    this.passData.emit(this.announcement);
    this.inputsForm.reset();
  }

  generateId(): string {
    const id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    return id;
  }

  reset() {
    this.inputsForm.reset();
  }

  private addDays(date: any, days: number ): Date {
    const result = new Date( date );
    result.setDate(result.getDate() + days - 1 );
    return result;
  }

  // validations
  checkDuration(control: FormControl) {
    if (control.value <= 0 || control.value > 30 ) {
      return {validDuration: true};
    } else {
      return null;
    }
  }
}
