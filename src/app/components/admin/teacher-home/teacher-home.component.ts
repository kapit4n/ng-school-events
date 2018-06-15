import { Component, OnInit, Input } from "@angular/core";
import { TeachersService } from "../../../services/teachers.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {

  assignedCourses = [];
  teacherId = "";
  teacher: any;
  confMessage = "";
  closeResult: string;

  constructor(private teachersSvc: TeachersService, private modalService: NgbModal,
    private route: ActivatedRoute) {
      this.teacher = {};
    }

  ngOnInit() {
    this.teacherId = this.route.snapshot.paramMap.get("id");
    this.teachersSvc.getTeacher(this.teacherId).subscribe(teacher => {
      this.teacher = teacher;
    });
    
    this.teachersSvc.getCourses(this.teacherId).subscribe(teacher => {
      this.assignedCourses = teacher;
    });


  }

}
