import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-course-home',
  templateUrl: './teacher-course-home.component.html',
  styleUrls: ['./teacher-course-home.component.css']
})
export class TeacherCourseHomeComponent implements OnInit {

  @Input() course: any;
  constructor() { }

  ngOnInit() {
  }

}
