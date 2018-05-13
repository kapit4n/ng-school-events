import { Component, OnInit } from '@angular/core';
import { StudentsService } from "../../../services/students.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any[];

  constructor(private studentsSvc: StudentsService) { }

  ngOnInit() {
    this.studentsSvc.getStudents().subscribe( students => {
      this.students = students;
      console.log(students);
    });
  }

}
