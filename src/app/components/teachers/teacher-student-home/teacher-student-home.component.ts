import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-teacher-student-home",
  templateUrl: "./teacher-student-home.component.html",
  styleUrls: ["./teacher-student-home.component.css"]
})
export class TeacherStudentHomeComponent implements OnInit {
  student = { firstName: "First Name", lastName: "Last Name" };
  newFollowUp = {};
  followUps = [
    {
      id: 1,
      registereddDate: "1-1-1",
      title: "Title",
      subject: "Subject",
      isDelayed: true,
      isAbsent: false,
      observation: "Subject "
    },
    {
      id: 2,
      registereddDate: "2-2-2",
      title: "Title 1",
      subject: "Subject 1",
      isDelayed: true,
      isAbsent: false,
      observation: "Subject 1"
    }
  ];

  constructor() {}

  ngOnInit() {}

  saveFollowUp() {
    this.newFollowUp = {};
  }
}
