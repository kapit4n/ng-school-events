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
      .subscribe(schoolYear => {
        this.schoolYear = schoolYear;
      });

    this.coursesSvc.getCourses().subscribe(courses => {
      this.availableCourses = courses;
    });
    this.loadCourses();
  }
  
  loadCourses() {
    this.schoolYearsSvc.getCourses().subscribe(assigned => this.assignedCourses = assigned );
  }

  addCourse(course) {
    let courseYear = {courseId: course.id, schoolYearId: this.yearId};
    this.schoolYearsSvc.addCourseToYear(courseYear).subscribe( updatedCourse => {
      this.loadCourses();
     });
  }

  removeCourse(courseId) {
  }
}
