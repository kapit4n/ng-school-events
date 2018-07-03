import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { ConfigurationService } from "../../../services/configuration.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-parent-list",
  templateUrl: "./parent-list.component.html",
  styleUrls: ["./parent-list.component.css"]
})
export class ParentListComponent implements OnInit {
  
  parentUsers: any[];
  pages = 10;
  currentPage = 0;
  constructor(private route: ActivatedRoute, private parentsSvc: ParentsService, private confSvc: ConfigurationService) {
    this.parentUsers = [];
  }
  
  ngOnInit() {
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }

    this.parentsSvc
      .getParents(
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(parents => {
        this.parentUsers = parents;
      });
    
    this.parentsSvc.getParentsCount().subscribe(countInfo => {
      this.pages = countInfo.count / this.confSvc.pageSize;
    });
  }
}
