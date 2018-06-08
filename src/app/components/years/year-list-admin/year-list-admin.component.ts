import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SchoolYearsService } from "../../../services/school-years.service";

@Component({
  selector: "app-year-list-admin",
  templateUrl: "./year-list-admin.component.html",
  styleUrls: ["./year-list-admin.component.css"]
})
export class YearListAdminComponent implements OnInit {
  closeResult: string;
  newSchoolYear: any;
  schoolYearList: any;
  searchText = "";
  constructor(
    private modalService: NgbModal,
    private schoolYearsSvc: SchoolYearsService
  ) {
    this.newSchoolYear = {};
    this.schoolYearList = [];
  }

  ngOnInit() {
    this.loadSchoolYears();
  }

  loadSchoolYears() {
    this.schoolYearsSvc
      .getSchoolYears(this.searchText)
      .subscribe(courses => (this.schoolYearList = courses));
  }

  saveSchoolYear() {
    let newSchoolYear = this.newSchoolYear;
    this.schoolYearsSvc.registerSchoolYear(newSchoolYear).subscribe(course => {
      this.loadSchoolYears();
      this.newSchoolYear = {};
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

  search() {
    this.loadSchoolYears();
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
