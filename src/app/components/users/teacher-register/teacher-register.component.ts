import { Component, OnInit } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-teacher-register",
  templateUrl: "./teacher-register.component.html",
  styleUrls: ["./teacher-register.component.css"]
})
export class TeacherRegisterComponent implements OnInit {
  teacher: any;

  constructor(private router: Router, private teachersSvc: TeachersService) {
    this.teacher = { userType: "teacher", password: "password" };
  }

  ngOnInit() {}

  onSave() {
    let teacherInfo = this.teacher;
    console.log(teacherInfo);
    this.teachersSvc.registerTeacher(teacherInfo).subscribe(res => {
      this.router.navigate(["/teacher-list"]);
    });
  }
}
