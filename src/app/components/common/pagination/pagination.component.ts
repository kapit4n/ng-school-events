import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  
  @Input() pages: number;
  @Input() currentPage: number;

  constructor() {
    this.pages = 0;
    this.currentPage = 0;
  }

  ngOnInit() {
  }

}
