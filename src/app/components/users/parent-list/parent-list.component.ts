import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";

@Component({
  selector: "app-parent-list",
  templateUrl: "./parent-list.component.html",
  styleUrls: ["./parent-list.component.css"]
})
export class ParentListComponent implements OnInit {
  
  parentUsers: any[];
  constructor(private parentsSvc: ParentsService) {
    this.parentUsers = [];
  }

  ngOnInit() {
    this.parentsSvc.getParents().subscribe(parents => {
      this.parentUsers = parents;
    });
  }
}
