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
  aParents = [];
  availableParents = [];
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
    this.loadParents();
  }

  loadCourses() {
    this.studentsSvc
      .getCourses()
      .subscribe(assigned => (this.assignedCourses = assigned));
  }

  loadParents() {
    this.studentsSvc
      .getParents()
      .subscribe(assigned => (this.aParents = assigned));
  }


  addCourse(course) {
    let courseYear = { courseId: course.id, studentId: this.studentId };
    this.coursesSvc
      .addStudentToCourse(courseYear)
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


  addParent(parent) {
    let parentYear = { parentId: parent.id, studentId: this.studentId };
    this.studentsSvc
      .saveParentStudentRel(parentYear)
      .subscribe(updatedCourse => {
        this.loadParents();
      });
  }

  removeParent(relId) {
    this.studentsSvc.removeParentStudentRel(relId).subscribe(res => {
      this.confMessage = "Parent Removed";
      this.loadParents();
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
