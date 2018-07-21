import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { QuestionsService } from "../../../services/questions.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-question-home',
  templateUrl: './question-home.component.html',
  styleUrls: ['./question-home.component.css']
})
export class QuestionHomeComponent implements OnInit {

  studentId = "0";
  course: any;
  questions = [];

  constructor(private route: ActivatedRoute,
      private parentsSvc: ParentsService,
      private questionsSvc: QuestionsService
  ) { 
    this.course = {};
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("id");
    this.parentsSvc.getCourseByStudentId(this.studentId).subscribe(courses => {
      this.course = courses[0];
  
      this.questionsSvc
        .getQuestions(this.course.course.id)
        .subscribe(questions => {
          this.questions = questions;
        });
    });
  }

}
