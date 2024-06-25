import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuestionRead } from '../../../models/question/iquestion-read';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss'],
})
export class QuestionDetailsComponent implements OnInit {
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<QuestionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IQuestionRead
  ) {
    this.questionForm = this.fb.group({
      title: [data?.title || ''],
      answer: [data?.answer || ''],
    });
  }
  ngOnInit(): void {}

  get title() {
    return this.questionForm.get('title');
  }
  get answer() {
    return this.questionForm.get('answer');
  }
}
