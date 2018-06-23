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
  courseYear: any;
  teacherId: any;
  students: any;
  constructor(
    private route: ActivatedRoute,
    private configSvc: ConfigurationService,
    public authSvc: AuthService,
    public rolesSvc: RolesService,
    public teachersSvc: TeachersService,
    public coursesSvc: CoursesService
  ) {
    this.courses = [];
    this.courseYear = {};
    this.students = [];
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
          this.courses = courses.map(c => { return { course: c.course, id: c.id, routeLink: "/teacher-course-home/" + c.id}; });
        });
      }
    });

    this.coursesSvc.getCourseYearById(this.courseId).subscribe(course => {
      this.courseYear = course[0];
    });

    this.coursesSvc.getStudents(this.courseId).subscribe(students => {
      this.students = students;
    });
  }
}