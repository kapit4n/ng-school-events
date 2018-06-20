import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { StudentsService } from "../../../services/students.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-son-home",
  templateUrl: "./son-home.component.html",
  styleUrls: ["./son-home.component.css"]
})
export class SonHomeComponent implements OnInit {
  studentParentRelId = "noId";
  studentParentRel: any;
  assignedCourses: any;
  constructor(
    private route: ActivatedRoute,
    private parentsSvc: ParentsService,
    private studentsSvc: StudentsService
  ) {
    this.studentParentRel = {};
  }

  ngOnInit() {
    this.studentParentRelId = this.route.snapshot.paramMap.get("id");
    this.parentsSvc.getStudent(this.studentParentRelId).subscribe( students => {
      this.studentParentRel = students[0];
      
      this.studentsSvc.getCourses(this.studentParentRel.student.id).subscribe(studentCourseRels => {

      });

      this.studentsSvc
        .getCourses(this.studentParentRel.student.id)
        .subscribe(courseStudents => {
          this.studentsSvc
            .getCourseYears(courseStudents)
            .subscribe(
              courseYears => (this.assignedCourses = courseYears)
            );
        });

    });    
  }

}
