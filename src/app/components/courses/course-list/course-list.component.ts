import { Component, OnInit } from "@angular/core";
import { ConfigurationService } from "../../../services/configuration.service";
import { AuthService } from "../../../services/auth.service";
import { RolesService } from "../../../services/roles.service";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"]
})
export class CourseListComponent implements OnInit {
  courseId: number;
  course: any;
  constructor(
    private configSvc: ConfigurationService,
    public authSvc: AuthService,
    public rolesSvc: RolesService
  ) {
    this.courseId = 1;
    this.course = {};
  }

  ngOnInit() {}

  loadCourse(courseId: number) {
    this.courseId = courseId;
  }
}
