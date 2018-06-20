import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable()
export class CoursesService {
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerCourse(course: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/courses", course)
      .map(res => res.json());
  }

  public getStudents(courseId = ""): Observable<any> {
    return this.http
      .get(
        this.configSvc.backendUrl +
          "/course-students?filter[include]=student&filter[where][course-yearId]=" + courseId
      )
      .map(res => res.json());
  }

  public getCourse(courseId): Observable<any> {
    return this.http.get(this.configSvc.backendUrl + "/courses/" + courseId + "").map(res => res.json());
  }

  public getCourses(filter = "", page = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          this.configSvc.backendUrl +
            "/courses?filter[where][name][regexp]=/" +
            filter + "/i"
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(this.configSvc.backendUrl + "/courses")
        .map(res => res.json());
    }
  }

  public getCoursesByYear(filter = "", page = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          this.configSvc.backendUrl +
            "/course-years?filter[include]=course"
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(this.configSvc.backendUrl +
          "/course-years?filter[include]=course")
        .map(res => res.json());
    }
  }

  public getCourseTeacherRel(courseId, teacherId): Observable<any> {
    return this.http
        .get(
          this.configSvc.backendUrl +
            "/course-teachers?filter[where][course-yearId]=" + courseId + "&filter[where][teacherId]=" + teacherId
        )
        .map(res => res.json());
  }

  public getCourseYears(courseId): Observable<any> {
    return this.http
        .get(
          this.configSvc.backendUrl +
            "/course-years?filter[include]=school-year&filter[where][courseId]=" + courseId
        )
        .map(res => res.json());
  }

  public getCourseYearById(courseYearId): Observable<any> {
    return this.http
        .get(
          this.configSvc.backendUrl +
            "/course-years?filter[include]=school-year&filter[include]=course&filter[where][id]=" + courseYearId
        )
        .map(res => res.json());
  }

  public getYearCourses(filter = "", page = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          this.configSvc.backendUrl +
            "/course-years?filter[include]=course"
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(
          this.configSvc.backendUrl +
            "/course-years?filter[include]=course"
        )
        .map(res => res.json());
    }
  }

  public removeStudentFromCourse(relId): Observable<any> {
    return this.http.delete(this.configSvc.backendUrl + "/course-students/" + relId).map(res => res.json());
  }

  public removeTeacherFromCourse(relId): Observable<any> {
    return this.http.delete(this.configSvc.backendUrl + "/course-teachers/" + relId).map(res => res.json());
  }

  public addStudentToCourse(courseStudent): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/course-students", courseStudent)
      .map(res => res.json());
  }

  public addTeacherToCourse(courseTeacher): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/course-teachers", courseTeacher)
      .map(res => res.json());
  }
}
