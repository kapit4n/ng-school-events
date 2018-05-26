import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-info-edit',
  templateUrl: './teacher-info-edit.component.html',
  styleUrls: ['./teacher-info-edit.component.css']
})
export class TeacherInfoEditComponent implements OnInit {

  @Input() teacher: any;
  constructor() {
    this.teacher = {};
  }

  ngOnInit() {
  }

}
