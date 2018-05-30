import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-show-ext',
  templateUrl: './user-info-show-ext.component.html',
  styleUrls: ['./user-info-show-ext.component.css']
})
export class UserInfoShowExtComponent implements OnInit {

  @Input() teacher: any;
  constructor() { 
    this.teacher = {};
  }

  ngOnInit() {
  }

}
