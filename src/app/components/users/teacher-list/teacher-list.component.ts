import { Component, OnInit } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";
import { ConfigurationService } from "../../../services/configuration.service";

@Component({
  selector: "app-teacher-list",
  templateUrl: "./teacher-list.component.html",
  styleUrls: ["./teacher-list.component.css"]
})
export class TeacherListComponent implements OnInit {
  teachers: any[];
  limit = 10;
  skip = 0;

  pages = 10;
  currentPage = 0;
  constructor(
    private teachersSvc: TeachersService,
    private confSvc: ConfigurationService
  ) {
    this.teachers = [];
  }
  
  ngOnInit() {
    this.teachersSvc.getTeachers(this.limit, this.skip).subscribe(teachers => {
      this.teachers = teachers;
    });
  
    this.teachersSvc.getTeachersCount().subscribe(countInfo => {
      this.pages = countInfo.count / this.confSvc.pageSize;
    });
  }
}
