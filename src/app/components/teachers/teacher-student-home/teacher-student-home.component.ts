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
      registereddDate: new Date(),
      subject: "Subject",
      isDelayed: true,
      isAbsent: false,
      title: "Title",
      historyDetails: "historyDetails",
      observation: "Observation "
    },
    {
      id: 2,
      registereddDate: new Date(),
      subject: "Subject 1",
      isDelayed: true,
      isAbsent: false,
      title: "Title 1",
      historyDetails: "historyDetails",
      observation: "Observation 1"
    }
  ];

  constructor() {}

  ngOnInit() {}

  saveFollowUp() {
    this.newFollowUp = {};
  }
}
