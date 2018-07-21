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
  questionMap = [];
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
    this.loadQuestions();
  }

  loadQuestions() {
    this.parentsSvc.getCourseByStudentId(this.studentId).subscribe(courses => {
      this.course = courses[0];
      this.questionsSvc
        .getQuestions(this.course["course-year"].courseId)
        .subscribe(questions => {
          this.questionMap = questions.reduce(function (map, obj) {
            map[obj.id] = obj;
            return map;
          }, {});
          this.questions = questions;
        });
    });
  }

  saveQuestion() {
    this.questionsSvc.registerQuestion(this.newQuestion).subscribe(question => {
      this.questions.push(question);
      this.questionMap[question.id] = question;
      this.newQuestion = {};
    });
  }

  saveAnswer(questionId: string, answerInput: string) {
    let answerDescr = (document.getElementById(answerInput + questionId) as HTMLInputElement).value);
    let answer = { description: answerDescr, questionId: questionId };

    this.questionsSvc.registerAnswer(answer).subscribe(answerResult => {
      this.questionMap[questionId].answers.push(answerResult);
      this.newQuestion = {};
    });
  }
}
