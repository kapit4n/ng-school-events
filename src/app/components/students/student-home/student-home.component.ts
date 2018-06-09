import { Component, OnInit } from '@angular/core';
import { CoursesService } from "../../../services/courses.service";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  assignedCourses = [];
  availableCourses = [];
  constructor(private coursesSvc: CoursesService) { }

  ngOnInit() {
    this.coursesSvc.getCourses().subscribe( courses => {
      this.availableCourses = courses;
    });
  }

  addCourse(course) {
    console.log("add course");
    this.assignedCourses.push(course);
  }

  removeCourse(courseId) {
    console.log("add course");
  }

}
