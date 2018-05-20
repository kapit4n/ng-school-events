import { Component, OnInit, Input } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";

@Component({
  selector: "app-teacher-info",
  templateUrl: "./teacher-info.component.html",
  styleUrls: ["./teacher-info.component.css"]
})
export class TeacherInfoComponent implements OnInit {
  @Input() teacher: any;
  editInfoFlag: boolean;
  editLabel: string;
  constructor(private teacherSvc: TeachersService) {
    this.editInfoFlag = true;
    this.editLabel = "Edit";
    this.teacher = {};
  }

  editInfo() {
    if (!this.editInfoFlag) {
      console.log("Save info to teachers api");
    }

    this.editInfoFlag = !this.editInfoFlag;
    if (this.editInfoFlag) {
      this.editLabel = "Edit"
    } else {
      this.editLabel = "Save"
    }
  }

  ngOnInit() {
    console.log(this.teacher);
  }
}
