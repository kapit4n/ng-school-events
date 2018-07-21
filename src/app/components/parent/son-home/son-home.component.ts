import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { StudentsService } from "../../../services/students.service";
import { ActivatedRoute } from "@angular/router";
import { FollowUpsService } from "../../../services/follow-ups.service";
import { ConfigurationService } from "../../../services/configuration.service";

@Component({
  selector: "app-son-home",
  templateUrl: "./son-home.component.html",
  styleUrls: ["./son-home.component.css"]
})
export class SonHomeComponent implements OnInit {
  studentParentRelId = "noId";
  studentParentRel: any;
  assignedCourses: any;
  sons = [];
  searchText = "";
  pages = 0;
  currentPage = 1;
  rangePages = [];
  followUps = [];

  constructor(
    private route: ActivatedRoute,
    private parentsSvc: ParentsService,
    private studentsSvc: StudentsService,
    private followUpsSvc: FollowUpsService,
    private confSvc: ConfigurationService
  ) {
    this.studentParentRel = {};
  }

  ngOnInit() {
    this.studentParentRelId = this.route.snapshot.paramMap.get("id");
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }
    this.parentsSvc.getStudent(this.studentParentRelId).subscribe(students => {
      this.studentParentRel = students[0];

      this.studentsSvc
        .getCourses(this.studentParentRel.id)
        .subscribe(courseStudents => {
          this.studentsSvc
            .getCourseYears(courseStudents)
            .subscribe(courseYears => (this.assignedCourses = courseYears));
        });
    });

    this.loadFollowUps();
  }

  loadFollowUps() {
    this.followUpsSvc
      .getFollowUps(
        this.studentParentRelId,
        this.searchText,
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(followUps => (this.followUps = followUps));

    this.followUpsSvc
      .getFollowUpsCount(this.studentParentRelId, this.searchText)
      .subscribe(countInfo => {
        this.pages = Math.round(countInfo.count / this.confSvc.pageSize);
        const range = (from, to, step) =>
          Array(Math.floor((to - from) / step) + 1)
            .fill(0)
            .map((v, i) => from + i * step);
        this.rangePages = range(1, this.pages, 1);
      });
  }
}
