import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class QuestionsService {
  questionUrl = "questions";
  answerUrl = "answers";
  includeAnswers = "filter[include]=answers";

  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public getQuestions(limit = 1, skip = 0): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/${this.questionUrl}?${this.includeAnswers}`)
      .map(res => res.json());
  }

  public registerQuestion(question: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.questionUrl}`, question)
      .map(res => res.json());
  }

  public registerAnswer(answer: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.answerUrl}`, answer)
      .map(res => res.json());
  }
}
