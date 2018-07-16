import { Component, OnInit, Input } from "@angular/core";
import { TeachersService } from "../../../services/teachers.service";
import { CoursesService } from "../../../services/courses.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-teacher-home",
  templateUrl: "./teacher-home.component.html",
  styleUrls: ["./teacher-home.component.css"]
})
export class TeacherHomeComponent implements OnInit {
  assignedCourses = [];
  availableCourses = [];
  teacherId = "";
  teacher: any;
  confMessage = "";
  closeResult: string;

  constructor(
    private teachersSvc: TeachersService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private coursesSvc: CoursesService
  ) {
    this.teacher = {};
  }

  ngOnInit() {
    this.teacherId = this.route.snapshot.paramMap.get("id");
    this.teachersSvc.getTeacher(this.teacherId).subscribe(teacher => {
      this.teacher = teacher;
    });

    this.coursesSvc.getYearCourses().subscribe(courses => {
      this.availableCourses = courses;
    });

    this.loadCourses();
  }

  loadCourses() {
    this.assignedCourses = [];
    this.teachersSvc.getCourses(this.teacherId).subscribe(teacher => {
      console.log(teacher);
      console.log(teacher);
      console.log(teacher);
      if (teacher.length > 0) {
        this.teachersSvc
            .getCourseYear(teacher)
            .subscribe(courses => {
              this.assignedCourses = courses;
            });
      }
    });
  }

  addCourse(course) {
    let courseTeacher = { "course-yearId": course.id, teacherId: this.teacherId };
    this.coursesSvc
      .addTeacherToCourse(courseTeacher)
      .subscribe(updatedCourse => {
        this.loadCourses();
      });
  }

  removeCourse(courseId) {
    this.coursesSvc.getCourseTeacherRel(courseId, this.teacherId).subscribe( rel => {
      this.coursesSvc
        .removeTeacherFromCourse(rel[0].id)
        .subscribe(res => {
          this.confMessage = "Course Removed";
          this.loadCourses();
        });
    });
  }

  addAllCourses() { }

}
