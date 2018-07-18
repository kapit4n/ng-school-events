import { Component, OnInit } from '@angular/core';
import { FollowUpsService } from "../../../services/follow-ups.service";
import { ConfigurationService } from "../../../services/configuration.service";

@Component({
  selector: "app-teacher-student-home",
  templateUrl: "./teacher-student-home.component.html",
  styleUrls: ["./teacher-student-home.component.css"]
})
export class TeacherStudentHomeComponent implements OnInit {
  student = { firstName: "First Name", lastName: "Last Name" };
  /*newFollowUp: {id?: number, registereddDate?: any, subject?: string, isDelayed?: boolean, isAbsent?: boolean,
    title?: string, historyDetails?: string, observation?: string };
  */
  followUps: {
    id: number;
    registeredDate: any;
    subject: string;
    isDelayed: boolean;
    isAbsent: boolean;
    title: string;
    historyDetails: string;
    observation: string;
  }[] = [
    {
      id: 1,
      registeredDate: new Date(),
      subject: "Subject",
      isDelayed: true,
      isAbsent: false,
      title: "Title",
      historyDetails: "historyDetails",
      observation: "Observation "
    },
    {
      id: 2,
      registeredDate: new Date(),
      subject: "Subject 1",
      isDelayed: true,
      isAbsent: false,
      title: "Title 1",
      historyDetails: "historyDetails",
      observation: "Observation 1"
    }
  ];

  newFollowUp: any;

  constructor(
    private followUpsSvc: FollowUpsService,
    private confSvc: ConfigurationService
  ) {
    this.newFollowUp = {};
  }

  ngOnInit() {}

  saveFollowUp() {
    this.newFollowUp.registeredDate = new Date();
    this.followUpsSvc.registerFollowUp(this.newFollowUp).subscribe( follow => console.log(follow));

    this.followUps.push(this.newFollowUp);
    this.newFollowUp = {};
  }
}
