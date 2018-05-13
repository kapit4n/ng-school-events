import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  student: any;

  constructor() {
    this.student = {};
  }

  ngOnInit() {
  }

  onSave() {
    let studentInfo = this.student;
    console.log(studentInfo);
  }

}
