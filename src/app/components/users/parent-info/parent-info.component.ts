import { Component, OnInit, Input } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";

@Component({
  selector: 'app-parent-info',
  templateUrl: './parent-info.component.html',
  styleUrls: ['./parent-info.component.css']
})
export class ParentInfoComponent implements OnInit {
  @Input() parent: any;
  editInfoFlag: boolean;
  editLabel: string;
  constructor(private parentsSvc: ParentsService) {
    this.editInfoFlag = false;
    this.editLabel = "Edit";
    this.parent = {};
  }

  editInfo() {
    if (this.editInfoFlag) {
      console.log("data send to parent endpoint");
      if (this.parent.id) {
        this.parentsSvc.updateParentInfo(this.parent).subscribe(res => this.parent = res);
      } else {
        this.parentsSvc.registerParentInfo(this.parent).subscribe(res => this.parent = res);
      }
    }

    this.editInfoFlag = !this.editInfoFlag;
    if (this.editInfoFlag) {
      this.editLabel = "Save"
    } else {
      this.editLabel = "Edit"
    }
  }

  ngOnInit() {
  }
}
