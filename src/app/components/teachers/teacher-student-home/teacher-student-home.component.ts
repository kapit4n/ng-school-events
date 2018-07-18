import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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
  studentId: any;
  courseId: any;
  newFollowUp: any;
  searchText = "";

  pages = 0;
  currentPage = 1;
  rangePages = [];


  constructor(
    private route: ActivatedRoute,
    private followUpsSvc: FollowUpsService,
    private confSvc: ConfigurationService
  ) {
    this.newFollowUp = {};
    this.followUps = [];
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("studentId");
    this.courseId = this.route.snapshot.paramMap.get("courseId");
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }
    this.loadFollowUps();
  }

  loadFollowUps() {
    this.followUpsSvc
      .getFollowUps(
        this.studentId,
        this.searchText,
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(followUps => (this.followUps = followUps));

    this.followUpsSvc
      .getFollowUpsCount(this.studentId, this.searchText)
      .subscribe(countInfo => {
        this.pages = Math.round(countInfo.count / this.confSvc.pageSize);
        const range = (from, to, step) =>
          Array(Math.floor((to - from) / step) + 1)
            .fill(0)
            .map((v, i) => from + i * step);
        this.rangePages = range(1, this.pages, 1);
      });
  }

  saveFollowUp() {
    this.newFollowUp.registeredDate = new Date();
    this.newFollowUp.studentId = this.studentId;
    this.followUpsSvc.registerFollowUp(this.newFollowUp).subscribe(follow => {
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
