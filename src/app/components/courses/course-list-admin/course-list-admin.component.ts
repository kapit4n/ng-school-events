import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-course-list-admin",
  templateUrl: "./course-list-admin.component.html",
  styleUrls: ["./course-list-admin.component.css"]
})
export class CourseListAdminComponent implements OnInit {
  closeResult: string;
  newCourse: any;
  constructor(private modalService: NgbModal) {
    this.newCourse = {};
  }

  ngOnInit() {}

  saveCourse() {
    console.log("Saving course");
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
