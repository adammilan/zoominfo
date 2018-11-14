import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'zoominfo';
  choosedInput;

  avail: boolean = false;
  questionList: any;
  questionNumber: number = 1;
  questionToShow;
  answersToShow;
  correctAnswer;
  questionListLength;
  sendBtn;
  secondClick;
  correctanswerCount: number = 0;

  constructor(private data: DataService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.data.getQuestion().then((res: any) => {
      this.questionList = res.results;
      console.log('array questions:', this.questionList);
      this.questionListLength = this.questionList.length;
      this.correctAnswer = this.questionList.find(q => q).correct_answer;
      this.questionToShow = this.questionList.find(q => q).question;
      this.answersToShow = this.shuffle(this.questionList.find(q => q).incorrect_answers.concat(this.questionList.find(q => q).correct_answer));
      console.log('answer:', this.correctAnswer);
    });
  }

  onSubmit(e, indicators) {
    this.sendBtn = e;
    if (this.secondClick) {
      this.nextQuestion();
      this.indicators(indicators);
    } else {
      if (this.checkForAnswer()) {
        this.choosedInput.element.classList.add('correct');
        this.secondClick = true;
        this.sendBtn.innerHTML = 'Continue';
      } else {
        this.choosedInput.element.classList.add('incorrect');
        this.secondClick = true;
        this.sendBtn.innerHTML = 'Continue';
      }
    }
  }

  nextQuestion() {
    this.questionList.shift();
    if (this.questionList.length > 0) {
      this.questionNumber = this.questionListLength - this.questionList.length + 1;
      this.correctAnswer = this.questionList.find(q => q).correct_answer;
      this.questionToShow = this.questionList.find(q => q).question;
      this.answersToShow = this.shuffle(this.questionList.find(q => q).incorrect_answers.concat(this.questionList.find(q => q).correct_answer));
      this.secondClick = false;
      this.sendBtn.innerHTML = 'OK';
      console.log('answer:', this.correctAnswer);
    } else {
      this.questionNumber = this.questionListLength - this.questionList.length + 1;
      const modalRef = this.modalService.open(PopupComponent);
      modalRef.componentInstance.correntanswerCount = this.correctanswerCount;
    }
  }

  indicators(listIndicators) {
    let indicator = Array.from(listIndicators.children)[this.questionNumber - 2];
    (indicator as HTMLElement).classList.add('active', 'pressed');
  }

  choose(elem, question) {
    Array.from(question.children).map((d: any) => {
      d.classList.remove('active');
    })
    elem.classList.add('active');
    this.avail = true;
    this.choosedInput = { element: elem, input: parseInt(elem.id) }
  }

  checkForAnswer(): boolean {
    if (this.answersToShow[this.choosedInput.input] === this.correctAnswer) {
      this.correctanswerCount++;
      this.choosedInput.element.firstElementChild.classList.remove('hideStatusImg');
      return true;
    } else {
      this.choosedInput.element.lastElementChild.classList.remove('hideStatusImg');
      return false;
    }
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
