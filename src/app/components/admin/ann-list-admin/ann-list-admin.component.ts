import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AnnsService } from "../../../services/anns.service";

@Component({
  selector: "app-ann-list-admin",
  templateUrl: "./ann-list-admin.component.html",
  styleUrls: ["./ann-list-admin.component.css"]
})
export class AnnListAdminComponent implements OnInit {
  newAnn: any;
  closeResult: string;
  searchText = "";
  annList: any;
  currentPage = 0;

  constructor(private modalService: NgbModal, private annsSvc: AnnsService) {
    this.newAnn = {};
    this.annList = [];
  }

  loadAnns() {
    this.annsSvc
      .getAnns(this.searchText, this.currentPage)
      .subscribe(anns => (this.annList = anns));
  }

  ngOnInit() {
    this.loadAnns();
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  search() {
    this.loadAnns();
  }

  saveAnn() {
    this.newAnn["year-schoolId"] = 1;
    this.newAnn["annType"] = "General";
    this.annsSvc.registerAnn(this.newAnn).subscribe(registered => {
      this.loadAnns();
    });
    this.newAnn = {};
  }

  deleteAnn(annId) {
    this.annsSvc.deleteAnn(annId).subscribe(ann => {
      this.loadAnns();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
