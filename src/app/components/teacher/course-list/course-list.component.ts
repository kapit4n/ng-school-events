import { Component, OnInit } from "@angular/core";
import { ConfigurationService } from "../../../services/configuration.service";
import { AuthService } from "../../../services/auth.service";
import { RolesService } from "../../../services/roles.service";
import { TeachersService } from "../../../services/teachers.service";
import { CoursesService } from "../../../services/courses.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"]
})
export class CourseListComponent implements OnInit {
  courseId: string;
  courses: any;
  course: any;
  teacherId: any;
  constructor(
    private route: ActivatedRoute,
    private configSvc: ConfigurationService,
    public authSvc: AuthService,
    public rolesSvc: RolesService,
    public teachersSvc: TeachersService,
    public coursesSvc: CoursesService
  ) {
    this.courses = [];
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get("courseId");
    this.teacherId = this.authSvc.getCurrentUserId();
    this.loadCourses();
  }

  loadCourses() {
    this.courses = [];
    this.teacherId = 1;
    this.teachersSvc.getCourses(this.teacherId).subscribe(teacher => {
      if (teacher.length > 0) {
        this.teachersSvc.getCourseYear(teacher).subscribe(courses => {
          this.courses = courses.map(c => { return { course: c.course, id: c.course.id, routeLink: "/teacher-course-home/" + c.course.id}; });
        });
      }
    });

    this.coursesSvc.getCourse(this.courseId).subscribe(course => {
      this.course = course;
    });
  }
}
