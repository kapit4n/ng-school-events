import { Component, OnInit } from '@angular/core';
import { StudentsService } from "../../../services/students.service";

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.css']
})
export class CourseHomeComponent implements OnInit {

  students: any[];

  constructor(private studentsSvc: StudentsService) { }

  ngOnInit() {
    this.studentsSvc.getStudents().subscribe( students => {
      this.students = students;
    });
  }

}
