import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from "../../../services/courses.service";
import { StudentsService } from "../../../services/students.service";
import { ParentsService } from "../../../services/parents.service";

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
  student: any;
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute, private parentsSvc: ParentsService, private coursesSvc: CoursesService,
    private studentsSvc: StudentsService) {
      this.student = {};
    }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("id");

    this.studentsSvc.getStudent(this.studentId).subscribe(student => {
      this.student = {};
    });

    this.coursesSvc.getCourses().subscribe( courses => {
      this.availableCourses = courses;
    });

    this.parentsSvc.getParents().subscribe( parents => {
      this.availableParents = parents;
    });

    this.loadCourses();
    this.loadParents();
  }

  loadCourses() {
    this.studentsSvc
      .getCourses(this.studentId)
      .subscribe(assigned => (this.assignedCourses = assigned));
  }

  loadParents() {
    this.studentsSvc
      .getParents(this.studentId)
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


  addParent(userParent) {
    console.log(userParent);
    let parentStudent = { parentId: userParent.parents.id, studentId: this.studentId };
    this.studentsSvc
      .saveParentStudentRel(parentStudent)
      .subscribe( _ => {
        this.loadParents();
      });
  }

  removeParent(relId) {
    this.studentsSvc.removeParentStudentRel(relId).subscribe(res => {
      this.confMessage = "Parent Removed";
      this.loadParents();
    });
  }

  addAllCourses() {

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
