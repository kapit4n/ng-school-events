import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-info-show',
  templateUrl: './teacher-info-show.component.html',
  styleUrls: ['./teacher-info-show.component.css']
})
export class TeacherInfoShowComponent implements OnInit {

  @Input() teacher: any;
  constructor() { 
    this.teacher = {};
  }

  ngOnInit() {
  }

}
