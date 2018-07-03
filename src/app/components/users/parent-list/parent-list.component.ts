import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { ConfigurationService } from "../../../services/configuration.service";

@Component({
  selector: "app-parent-list",
  templateUrl: "./parent-list.component.html",
  styleUrls: ["./parent-list.component.css"]
})
export class ParentListComponent implements OnInit {
  
  parentUsers: any[];
  pages = 10;
  currentPage = 0;
  constructor(private parentsSvc: ParentsService, private confSvc: ConfigurationService) {
    this.parentUsers = [];
  }
  
  ngOnInit() {
    this.parentsSvc.getParents().subscribe(parents => {
      this.parentUsers = parents;
    });
    
    this.parentsSvc.getParentsCount().subscribe(countInfo => {
      this.pages = countInfo.count / this.confSvc.pageSize;
    });
  }
}
