import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from "../../../services/courses.service";
import { SchoolYearsService } from "../../../services/school-years.service";

@Component({
  selector: "app-year-home",
  templateUrl: "./year-home.component.html",
  styleUrls: ["./year-home.component.css"]
})
export class YearHomeComponent implements OnInit {
  assignedCourses = [];
  availableCourses = [];
  yearId = "";
  schoolYear: any;
  confMessage = "";
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private coursesSvc: CoursesService,
    private schoolYearsSvc: SchoolYearsService
  ) {
    this.schoolYear = {};
  }

  ngOnInit() {
    this.yearId = this.route.snapshot.paramMap.get("id");
    this.schoolYearsSvc.getSchoolYear(this.yearId).subscribe(schoolYear => {
      this.schoolYear = schoolYear;
    });

    this.coursesSvc.getCourses().subscribe(courses => {
      this.availableCourses = courses;
    });
    this.loadCourses();
  }

  loadCourses() {
    this.schoolYearsSvc
      .getCourses()
      .subscribe(assigned => (this.assignedCourses = assigned));
  }

  addCourse(course) {
    let courseYear = { courseId: course.id, schoolYearId: this.yearId };
    this.schoolYearsSvc.addCourseToYear(courseYear).subscribe(updatedCourse => {
      this.loadCourses();
    });
  }

  removeCourse(courseId) {
    this.schoolYearsSvc.removeCourseFromYear(courseId).subscribe(res => {
      this.confMessage = "Course ";
      console.log("Removed user");
      this.loadCourses();
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
