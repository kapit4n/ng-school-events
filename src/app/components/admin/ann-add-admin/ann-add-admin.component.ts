import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ann-add-admin',
  templateUrl: './ann-add-admin.component.html',
  styleUrls: ['./ann-add-admin.component.css']
})
export class AnnAddAdminComponent implements OnInit {

  @Input() annInfo: any;
  constructor() {
    this.annInfo = {};
  }

  ngOnInit() {
  }

}
