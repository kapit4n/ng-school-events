import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { QuestionsService } from "../../../services/questions.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-question-home",
  templateUrl: "./question-home.component.html",
  styleUrls: ["./question-home.component.css"]
})
export class QuestionHomeComponent implements OnInit {
  studentId = "0";
  course: any;
  questions = [];
  newQuestion: any;

  constructor(
    private route: ActivatedRoute,
    private parentsSvc: ParentsService,
    private questionsSvc: QuestionsService
  ) {
    this.course = {};
    this.newQuestion = {};
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("id");
    this.loadQuestion();
  }

  loadQuestion() {
    this.parentsSvc
      .getCourseByStudentId(this.studentId)
      .subscribe(courses => {
        this.course = courses[0];
        this.questionsSvc
          .getQuestions(this.course["course-year"].courseId)
          .subscribe(questions => {
            this.questions = questions;
          });
      });
  }

  saveQuestion() {
    console.log(this.newQuestion);
    this.questionsSvc
      .registerQuestion(this.newQuestion)
      .subscribe(follow => {
        this.loadQuestion();
        this.newQuestion = {};
      });
  }
}