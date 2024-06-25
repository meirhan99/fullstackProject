import { Component, Inject, OnInit, inject } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../../../models/iresponse';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.scss'],
})
export class DeleteQuestionComponent implements OnInit {
  constructor(
    private questionService: QuestionService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.questionService.DeleteQuestions(this.data).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.toastr.success(response.messages.toString());
        this.dialog.close(true);
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
}
