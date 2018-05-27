import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-register',
  templateUrl: './parent-register.component.html',
  styleUrls: ['./parent-register.component.css']
})
export class ParentRegisterComponent implements OnInit {

  parentInfo: any;
  constructor() {
    this.parentInfo = { userType: "parent", password: "password" };
  }

  ngOnInit() {

  }

  onSave() {
    console.log("Save parent invite info");
  }

}
