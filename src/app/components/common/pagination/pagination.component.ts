import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  
  @Input() pages: number;
  @Input() currentPage: number;
  @Input() baseUrl: string;

  constructor() {
    this.pages = 1;
    this.currentPage = 1;
    this.baseUrl = "";
  }

  ngOnInit() {
  }

}
