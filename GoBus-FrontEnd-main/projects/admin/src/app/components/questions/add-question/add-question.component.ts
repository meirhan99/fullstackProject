import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../../services/question/question.service';
import { IQuestion } from 'projects/user/src/app/models/iquestion';
import { IResponse } from '../../../models/iresponse';
import { IQuestionAdd } from '../../../models/question/iquestion-add';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private dialog: MatDialogRef<AddQuestionComponent>,
    private toastr: ToastrService
  ) {
    this.questionForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9_ !@#$%^&*’“”'".()_+\-=\[\]{};':"\\|,.<>\/?]*$/
          ),
        ],
      ],
      answer: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9_ !@#$%^&*’“”'".()_+\-=\[\]{};':"\\|,.<>\/?]*$/
          ),
        ],
      ],
    });
  }
  ngOnInit(): void {}
  Add() {
    let question: IQuestionAdd = this.questionForm.value;

    this.questionService.AddQuestions(question).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.toastr.success(response.messages.toString());
        this.dialog.close(true);
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  get title() {
    return this.questionForm.get('title');
  }
  get answer() {
    return this.questionForm.get('answer');
  }
}
