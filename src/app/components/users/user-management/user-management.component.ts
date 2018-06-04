import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ParentsService } from "../../../services/parents.service";
import { TeachersService } from "../../../services/teachers.service";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"]
})
export class UserManagementComponent implements OnInit {

  closeResult: string;
  teachers: any[];
  parents: any[];
  teacherInfo: any;
  parentInfo: any;
  constructor(private modalService: NgbModal, private teachersSvc: TeachersService,
              private parentsSvc: ParentsService) {
    this.teachers = [];
    this.parents = [];
    this.teacherInfo = { userType: "teacher", password: "password" };
    this.parentInfo = { userType: "parent", password: "password" };
  }

  ngOnInit() {
    this.loadTeachers();
    this.loadParents();
  }
  
  loadTeachers() {
    this.teachersSvc.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });
  }
  
  loadParents() {
    this.parentsSvc.getParents().subscribe(parents => {
      this.parents = parents;
    });
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

  inviteParent() {
    let parentInfo = this.parentInfo;
    this.parentsSvc.registerParent(parentInfo).subscribe(res => {
      this.parentInfo = { userType: "parent", password: "password" };
      this.loadParents();
    });
  }
  
  inviteTeacher() {
    let teacherInfo = this.teacherInfo;
    this.teachersSvc.registerTeacher(teacherInfo).subscribe(res => {
      this.teacherInfo = { userType: "teacher", password: "password" };
      this.loadTeachers();
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
