import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Announcement} from '../announcements.model';
import {RolesService} from '../../../services/roles.service';


@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class CalendarModalComponent implements OnInit {
  closeResult: string;
  inputsForm: FormGroup;
  inputsCourseForm: FormGroup;
  title: string;
  description: string;
  startDateField: Date;
  durationField: number;
  announcement = new Announcement();
  @Output() passData: EventEmitter<Object> = new EventEmitter();
  currentAction: string;

  // multi-select
  // itemList = [];
  // selectedItems = [];
  // settings = {};
  itemList = [
    { "id": 1, "itemName": "Angular" },
    { "id": 2, "itemName": "JavaScript" },
    { "id": 3, "itemName": "HTML" },
    { "id": 4, "itemName": "CSS" },
    { "id": 5, "itemName": "ReactJS" },
    { "id": 6, "itemName": "HTML5" }
  ];
  selectedItems = [];
  settings = {
    text: "Select Skills",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    classes: "myclass custom-class"
  };
  @Output() passCFData: EventEmitter<Object> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public rolesSvc: RolesService) {
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
    this.inputsCourseForm = this.fb.group({
      skills: [[], Validators.required],
      title: ['', [Validators.required]],
      description: [''],
      startDateField: ['', [Validators.required]],
      durationField: ['', [Validators.required, this.checkDuration]]
    });
  }

  open(action: string, content) {
    this.currentAction = action;
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

  setCFValues() {
    // this.announcement.id = this.generateId();
    // this.announcement.title = this.inputsForm.get('title').value;
    // this.announcement.description = this.inputsForm.get('description').value;
    // this.announcement.startDate = this.inputsForm.get('startDateField').value;
    // this.announcement.endDate = this.inputsForm.get('durationField').value;
    // this.announcement.endDate = this.addDays(this.announcement.startDate, this.announcement.endDate);
    // this.passData.emit(this.announcement);
    this.passCFData.emit(this.inputsCourseForm.getRawValue());
    this.inputsCourseForm.reset();
  }

  generateId(): string {
    const id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    return id;
  }

  reset() {
    this.inputsForm.reset();
  }

  resetCF() {
    this.inputsCourseForm.reset();
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

  // multi-select

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
