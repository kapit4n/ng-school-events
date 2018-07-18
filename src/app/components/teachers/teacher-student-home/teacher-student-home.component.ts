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
  followUps: any;

  newFollowUp: any;

  constructor(
    private followUpsSvc: FollowUpsService,
    private confSvc: ConfigurationService
  ) {
    this.newFollowUp = {};
    this.followUps = [];
  }

  ngOnInit() {
    this.loadFollowUps();
  }

  loadFollowUps(){
    this.followUpsSvc.getFollowUps().subscribe (followUps => this.followUps = followUps);
  }

  saveFollowUp() {
    this.newFollowUp.registeredDate = new Date();
    this.followUpsSvc
      .registerFollowUp(this.newFollowUp)
      .subscribe(follow => {
        this.loadFollowUps();
        this.newFollowUp = {};
      });
  }

  removeFollowUp(id) {
    this.followUpsSvc.removeFollowUp(id).subscribe(result => {
      this.loadFollowUps();
    });
  }
}
