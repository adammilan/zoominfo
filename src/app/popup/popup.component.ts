import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
})
export class PopupComponent implements OnInit {

  @Input() correntanswerCount;
  msg: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (this.correntanswerCount <= 2) {
      this.msg = 'Not too bad'
    }
    if (this.correntanswerCount >= 3 && this.correntanswerCount < 5) {
      this.msg = 'Nice!'
    }
    if (this.correntanswerCount >= 5){
      this.msg ='Excellent!'
    } 
  }

}
