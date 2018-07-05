import { Component, OnInit } from '@angular/core';
import { StudentsService } from "../../../services/students.service";
import { ConfigurationService } from "../../../services/configuration.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  students: any[];
  searchText = "";

  pages = 0;
  currentPage = 1;
  rangePages = [];

  constructor(
    private route: ActivatedRoute,
    private studentsSvc: StudentsService,
    private confSvc: ConfigurationService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }
    this.loadStudents();
  }

  loadStudents() {
    this.studentsSvc
      .getStudents(
        this.searchText,
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(students => {
        this.students = students;
      });
      
    this.studentsSvc
      .getStudentsCount(this.searchText)
      .subscribe(countInfo => {
        this.pages = countInfo.count / this.confSvc.pageSize;
        const range = (from, to, step) =>
          Array(Math.floor((to - from) / step) + 1)
            .fill(0)
            .map((v, i) => from + i * step);
        this.rangePages = range(1, this.pages, 1);
      });
  }

  search() {
    this.loadStudents();
  }
}
