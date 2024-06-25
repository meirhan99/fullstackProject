import { Component, OnInit, ViewChild } from '@angular/core';
import { IQuestion } from '../../models/iquestion';
import { IResponse } from '../../models/iresponse';
import { FAQService } from '../../services/faq/faq.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],

})
export class QuestionComponent implements OnInit {

  questions: IQuestion[] = [];
  response: IResponse = {} as IResponse;
  constructor(private service: FAQService) {}
  ngOnInit(): void {
    this.GetAllQuestions();
  }

  GetAllQuestions() {
    this.service.GetAllQuestions().subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.questions = this.response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
}
