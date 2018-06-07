import { Component, OnInit } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  teachers: any[];
  limit = 10;
  skip = 0;

  constructor(private teachersSvc: TeachersService) {
    this.teachers = [];
  }

  ngOnInit() {
    this.teachersSvc.getTeachers(this.limit, this.skip).subscribe(teachers => {
      this.teachers = teachers;
    });
  }

}
