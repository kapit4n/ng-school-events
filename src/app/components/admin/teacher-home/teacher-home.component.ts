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

    this.teachersSvc.getCourses(this.teacherId).subscribe(teacher => {
      this.teachersSvc.getCourseYear(teacher).subscribe(courses => {
        this.assignedCourses = courses;
      });
    });
  }
  
  loadCourses() {
    this.teachersSvc.getCourses(this.teacherId).subscribe(teacher => {
      this.assignedCourses = teacher;
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
    this.coursesSvc.removeStudentFromCourse(courseId).subscribe(res => {
      this.confMessage = "Course Removed";
      this.loadCourses();
    });
  }
}
