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
  constructor(private teachersSvc: TeachersService) {
    this.editInfoFlag = true;
    this.editLabel = "Edit";
    this.teacher = {};
  }

  editInfo() {
    if (!this.editInfoFlag) {
      if (this.teacher.id) {
        this.teachersSvc.updateTeacherInfo(this.teacher).subscribe( res => this.teacher = res);
      } else {
        this.teachersSvc.registerTeacherInfo(this.teacher).subscribe( res => this.teacher = res);
      }
    }

    this.editInfoFlag = !this.editInfoFlag;
    if (this.editInfoFlag) {
      this.editLabel = "Edit"
    } else {
      this.editLabel = "Save"
    }
  }

  ngOnInit() {
  }
}
