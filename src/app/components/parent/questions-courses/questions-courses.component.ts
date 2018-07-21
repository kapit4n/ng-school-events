import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";

@Component({
  selector: "app-questions-courses",
  templateUrl: "./questions-courses.component.html",
  styleUrls: ["./questions-courses.component.css"]
})
export class QuestionsCoursesComponent implements OnInit {
  sons = [];
  constructor(private parentsSvc: ParentsService) {}

  ngOnInit() {
    this.parentsSvc
      .getSons()
      .subscribe(
        sons =>
          (this.sons = sons.map(son => {
            return {
              id: son.id,
              routeLink: "./../../../parent/son/" + son.id,
              student: son.student
            };
          }))
      );
  }
}
