import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId;
  qTitle;
  question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qId;
    this.qTitle = this._route.snapshot.params.title;
    this.question.quiz['qId'] = this.qId;
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }

    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }

    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Successfully added Question!', 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error) => {
        Swal.fire(
          'Error!',
          'Error while adding question! Please try again later!',
          'error'
        );
      }
    );
  }
}
