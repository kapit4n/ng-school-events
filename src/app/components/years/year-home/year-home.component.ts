import { Component, OnInit } from '@angular/core';
import { CoursesService } from "../../../services/courses.service";
import { SchoolYearsService } from "../../../services/school-years.service";
import { ActivatedRoute } from "@angular/router";

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
  constructor(private route: ActivatedRoute, private coursesSvc: CoursesService, private schoolYearsSvc: SchoolYearsService) {
    this.schoolYear = {};
  }
  
  ngOnInit() {
    this.yearId = this.route.snapshot.paramMap.get("id");
    this.schoolYearsSvc
      .getSchoolYear(this.yearId)
      .subscribe(schoolYear => (this.schoolYear = schoolYear));

    this.coursesSvc.getCourses().subscribe(courses => {
      this.availableCourses = courses;
    });
  }

  addCourse(course) {
    this.schoolYear.courses.push(course);
    this.assignedCourses = this.schoolYear.courses;
  }

  removeCourse(courseId) {
    console.log("add course");
  }
}
