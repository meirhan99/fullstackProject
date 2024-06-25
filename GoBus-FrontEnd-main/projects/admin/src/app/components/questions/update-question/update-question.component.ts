import { Component, Inject, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuestionRead } from '../../../models/question/iquestion-read';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss'],
})
export class UpdateQuestionComponent implements OnInit {
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<UpdateQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IQuestionRead
  ) {
    this.questionForm = this.fb.group({
      title: [
        data?.title || '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9_ !@#$%^&*’“”'".()_+\-=\[\]{};':"\\|,.<>\/?]*$/
          ),
        ],
      ],
      answer: [
        data?.answer || '',
        // /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
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
  Update() {
    this.questionService
      .UpdateQuestion(this.data.id, this.questionForm.value)
      .subscribe({
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
