import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from "../../../services/courses.service";
import { StudentsService } from "../../../services/students.service";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  closeResult: string;
  assignedCourses = [];
  availableCourses = [];
  studentId = "";
  confMessage = "";
  student = {};
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute, private coursesSvc: CoursesService, private studentsSvc: StudentsService) {

  }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("id");

    this.studentsSvc.getStudent(this.studentId).subscribe(student => {
      this.student = student
    });

    this.coursesSvc.getCourses().subscribe( courses => {
      this.availableCourses = courses;
    });

    this.loadStudents();
  }

  loadStudents() {
    this.studentsSvc
      .getCourses()
      .subscribe(assigned => (this.assignedCourses = assigned));
  }


  addCourse(course) {
    let courseYear = { courseId: course.id, studentId: this.studentId };
    this.coursesSvc
      .addStudentToCourse(courseYear)
      .subscribe(updatedCourse => {
        this.loadStudents();
      });
  }

  removeCourse(courseId) {
    this.coursesSvc.removeStudentFromCourse(courseId).subscribe(res => {
      this.confMessage = "Course Removed";
      this.loadStudents();
    });
  }

    open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

}
