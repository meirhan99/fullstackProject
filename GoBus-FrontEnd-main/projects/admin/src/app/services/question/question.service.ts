import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IQuestionAdd } from '../../models/question/iquestion-add';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  GetAllQuestions() {
    return this.http.get(`${environment.Api}/Questions`);
  }

  AddQuestions(question: IQuestionAdd) {
    return this.http.post(`${environment.Api}/Questions`, question);
  }

  UpdateQuestion(questionId: number, question: IQuestionAdd) {
    return this.http.put(
      `${environment.Api}/Questions/${questionId}`,
      question
    );
  }

  DeleteQuestions(questionId: number) {
    return this.http.delete(`${environment.Api}/Questions/${questionId}`);
  }
}
