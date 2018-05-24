import { Component, OnInit } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  teachers: any[];

  constructor(private teachersSvc: TeachersService) { }

  ngOnInit() {
    this.teachersSvc.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });
  }

}
