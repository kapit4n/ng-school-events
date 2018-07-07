import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


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
    this.passData.emit({titleField: this.titleField, startDateField: this.startDateField, durationField: this.durationField });
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
