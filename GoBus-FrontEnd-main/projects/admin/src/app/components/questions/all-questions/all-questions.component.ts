import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponse } from '../../../models/iresponse';

import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { IQuestionRead } from '../../../models/question/iquestion-read';
import { QuestionService } from '../../../services/question/question.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteQuestionComponent } from '../delete-question/delete-question.component';
import { UpdateQuestionComponent } from '../update-question/update-question.component';
import { QuestionDetailsComponent } from '../question-details/question-details.component';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss'],
})
export class AllQuestionsComponent implements OnInit {
  questions: IQuestionRead[] = [];

  constructor(
    private questionService: QuestionService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetAllQuestions();
  }

  GetAllQuestions() {
    this.questionService.GetAllQuestions().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.questions = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
  AddQuestion() {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllQuestions();
      }
    });
  }

  UpdateQuestion(question: IQuestionRead) {
    const dialogRef = this.dialog.open(UpdateQuestionComponent, {
      width: '750px',
      data: question,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllQuestions();
      }
    });
  }

  QuestionDetails(question: IQuestionRead) {
    const dialogRef = this.dialog.open(QuestionDetailsComponent, {
      width: '750px',
      data: question,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllQuestions();
      }
    });
  }

  DeleteQuestion(questionId: number) {
    const dialogRef = this.dialog.open(DeleteQuestionComponent, {
      width: '750px',
      data: questionId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllQuestions();
      }
    });
  }
}
