import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from "../../../services/courses.service";
import { StudentsService } from "../../../services/students.service";
import { ParentsService } from "../../../services/parents.service";
import { SchoolYearsService } from "../../../services/school-years.service";
import { UtilsService } from "../../../services/utils.service";

@Component({
  selector: "app-student-home",
  templateUrl: "./student-home.component.html",
  styleUrls: ["./student-home.component.css"]
})
export class StudentHomeComponent implements OnInit {
  closeResult: string;
  assignedCourses = [];
  availableCourses = [];
  aParents = [];
  availableParents = [];
  studentId = "";
  confMessage = "";
  student: any;
  currentYear: any;
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private parentsSvc: ParentsService,
    private coursesSvc: CoursesService,
    private studentsSvc: StudentsService,
    private schoolYearsSvc: SchoolYearsService,
    private utilsSvc: UtilsService) {
    this.student = {};
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("id");

    this.studentsSvc.getStudent(this.studentId).subscribe(student => {
      this.student = student;
    });

    this.utilsSvc.getCurrentSchoolYear().subscribe(cYear => {
      this.currentYear = cYear[0];
    });

    this.loadCourses();
    this.loadParents();
  }

  loadCourses() {
    this.availableCourses = [];
    this.assignedCourses = [];
    this.schoolYearsSvc.getCurrentSchoolYear().subscribe(current => {
      this.currentYear = current[0];
      this.studentsSvc.getCourses(this.studentId).subscribe(courseStudents => {

        if (courseStudents.length > 0) {
          this.studentsSvc
            .getCourseYears(courseStudents)
            .subscribe(courseYears => {
              this.assignedCourses = courseYears;

              this.coursesSvc
                .getCurrentCoursesByYear(this.currentYear.id)
                .subscribe(courses => {
                  courses.forEach(course => {
                    if ( !this.assignedCourses.some( c => c.id == course.id ) ) {
                      this.availableCourses.push(course);
                    }
                  });
                  this.availableCourses.sort((n1, n2) =>
                  {
                    if (!n2 || !n1) {
                      return 0
                    }
                    n1.course.name.localeCompare(n2.course.name)
                  }
                  );
                });
            });
        } else {
          
          this.coursesSvc
            .getCurrentCoursesByYear(this.currentYear.id)
            .subscribe(courses => {
              this.availableCourses = courses;
              this.availableCourses.sort((n1, n2) =>
              {
                if (!n2) return 0;
                n1.course.name.localeCompare(n2.course.name)
              }
              );
            });
        }
      });
    });
  }

  loadParents() {
    this.studentsSvc.getParents(this.studentId).subscribe(assigned => {
      this.aParents = assigned;
      this.availableParents = [];
      if (this.aParents.length > 0) {
        this.parentsSvc.getParents().subscribe(parents => {
          parents.forEach(parent => {
            if (parent.emailVerified && parent.parents) {
              if (!this.aParents.some(p => p.parent.id == parent.parents.id)) {
                this.availableParents.push(parent);
              }
            }
          });
          this.availableParents.sort((n1, n2) => {
            if (!n2) return 0;
            n1.parents && n1.parents.firstName.localeCompare( n2.parents.firstName )
          }
          );
        });
      } else {
        this.parentsSvc.getParents().subscribe(parents => {
          parents.forEach(parent => {
            if (parent.emailVerified && parent.parents) {
              this.availableParents.push(parent);
            }
          });
          this.availableParents.sort((n1, n2) =>
            n1.parents.firstName.localeCompare(n2.parents.firstName)
          );
        });
      }
    });
  }

  addCourse(course) {
    if (this.assignedCourses.length == 0) {
      let courseYear = { "course-yearId": course.id, studentId: this.studentId };
      this.coursesSvc.addStudentToCourse(courseYear).subscribe(updatedCourse => {
        this.loadCourses();
      });
    } else {
      console.log("remove first the course");
    }
  }

  removeCourse(courseId) {
    this.coursesSvc
      .getCourseStudentRel(courseId, this.studentId)
      .subscribe(rel => {
        this.coursesSvc.removeStudentFromCourse(rel[0].id).subscribe(res => {
          this.confMessage = "Course Removed";
          this.loadCourses();
        });
      });
  }

  addParent(userParent) {
    let parentStudent = {
      parentId: userParent.parents.id,
      studentId: this.studentId
    };
    this.studentsSvc.saveParentStudentRel(parentStudent).subscribe(_ => {
      this.loadParents();
    });
  }

  removeParent(relId) {
    this.studentsSvc.removeParentStudentRel(relId).subscribe(res => {
      this.confMessage = "Parent Removed";
      this.loadParents();
    });
  }

  addAllCourses() {}

  open(content) {
    this.modalService.open(content, { size: "lg" }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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
