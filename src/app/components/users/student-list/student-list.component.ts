import { Component, OnInit } from '@angular/core';
import { StudentsService } from "../../../services/students.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any[];
  searchText = "";
  currentPage = 0;
  constructor(private studentsSvc: StudentsService) {
    
  }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentsSvc.getStudents(this.searchText, this.currentPage).subscribe( students => {
      this.students = students;
    });
  }
  
  search() {
    this.loadStudents();
  }
}
