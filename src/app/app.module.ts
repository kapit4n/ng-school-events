import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfigurationService } from './services/configuration.service';
import { GestionService } from './services/gestion.service';
import { StudentsService } from './services/students.service';
import { TeachersService } from './services/teachers.service';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';
import { UsersService } from './services/users.service';
import { RolesService } from './services/roles.service';
import { ParentsService } from './services/parents.service';
import { CoursesService } from './services/courses.service';
import { SchoolYearsService } from './services/school-years.service';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { TodaysComponent } from './components/todays/todays.component';
import { IncomingComponent } from './components/incoming/incoming.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GestionCurrentComponent } from './components/gestion-current/gestion-current.component';
import { GestionListComponent } from './components/gestion-list/gestion-list.component';
import { StudentRegisterComponent } from './components/users/student-register/student-register.component';
import { UserManagementComponent } from './components/users/user-management/user-management.component';
import { StudentListComponent } from './components/users/student-list/student-list.component';
import { TeacherRegisterComponent } from './components/users/teacher-register/teacher-register.component';
import { TeacherListComponent } from './components/users/teacher-list/teacher-list.component';
import { UserInfoComponent } from './components/users/user-info/user-info.component';
import { LoginInfoComponent } from './components/users/login-info/login-info.component';
import { LoginComponent } from './components/login/login.component';
import { TeacherInfoComponent } from './components/users/teacher-info/teacher-info.component';
import { TeacherProfileComponent } from './components/users/teacher-profile/teacher-profile.component';
import { UserInfoEditComponent } from './components/users/user-info-edit/user-info-edit.component';
import { CourseHomeComponent } from './components/admin/course-home/course-home.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { AdminRegisterComponent } from './components/users/admin-register/admin-register.component';
import { UserInviteComponent } from './components/users/user-invite/user-invite.component';
import { CourseListComponent } from './components/admin/course-list/course-list.component';
import { StudentFollowUpComponent } from './components/students/student-follow-up/student-follow-up.component';
import { ParentListComponent } from './components/users/parent-list/parent-list.component';
import { ParentRegisterComponent } from './components/users/parent-register/parent-register.component';
import { ParentInfoComponent } from './components/users/parent-info/parent-info.component';
import { UserInfoShowExtComponent } from "./components/users/user-info-show-ext/user-info-show-ext.component";
import { UserInfoEditExtComponent } from './components/users/user-info-edit-ext/user-info-edit-ext.component';
import { ParentProfileComponent } from './components/users/parent-profile/parent-profile.component';
import { UserInviteListComponent } from './components/users/user-invite-list/user-invite-list.component';
import { UserFirstTimeComponent } from './components/users/user-first-time/user-first-time.component';
import { CourseListAdminComponent } from './components/admin/course-list-admin/course-list-admin.component';
import { CourseAddAdminComponent } from './components/admin/course-add-admin/course-add-admin.component';
import { GestionAddAdminComponent } from './components/gestions/gestion-add-admin/gestion-add-admin.component';
import { YearAddAdminComponent } from './components/admin/year-add-admin/year-add-admin.component';
import { YearListAdminComponent } from './components/admin/year-list-admin/year-list-admin.component';
import { StudentHomeComponent } from './components/admin/student-home/student-home.component';  
import { StudentCourseComponent } from './components/admin/student-course/student-course.component';
import { StudentParentsComponent } from './components/admin/student-parents/student-parents.component';
import { YearCourseComponent } from './components/admin/year-course/year-course.component';
import { YearHomeComponent } from './components/admin/year-home/year-home.component';
import { TeacherManagementComponent } from './components/users/teacher-management/teacher-management.component';
import { StudentManagementComponent } from './components/users/student-management/student-management.component';
import { ParentManagementComponent } from './components/users/parent-management/parent-management.component';
import { TeacherHomeComponent } from './components/admin/teacher-home/teacher-home.component';
import { ParentHomeComponent } from './components/admin/parent-home/parent-home.component';

const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "todays", component: TodaysComponent },
  { path: "incoming", component: IncomingComponent },
  { path: "gestion-current", component: GestionCurrentComponent },
  { path: "teacher-management", component: TeacherManagementComponent },
  { path: "parent-management", component: ParentManagementComponent },
  { path: "student-management", component: StudentManagementComponent },
  { path: "user-first-time/:email", component: UserFirstTimeComponent },
  { path: "student-register", component: StudentRegisterComponent },
  { path: "student-list", component: StudentListComponent },
  { path: "teacher-register", component: TeacherRegisterComponent },
  { path: "teacher-list", component: TeacherListComponent },
  { path: "teacher-profile", component: TeacherProfileComponent },
  { path: "parent-register", component: ParentRegisterComponent },
  { path: "parent-list", component: ParentListComponent },
  { path: "parent-profile", component: ParentProfileComponent },
  { path: "course-list-admin/:id", component: CourseHomeComponent },
  { path: "course-list", component: CourseListComponent },
  { path: "course-list-admin", component: CourseListAdminComponent },
  { path: "course-add-admin", component: CourseAddAdminComponent },
  { path: "years", component: YearListAdminComponent },
  { path: "year-add-admin", component: YearAddAdminComponent },
  { path: "years/:id", component: YearHomeComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "admin-register", component: AdminRegisterComponent },
  { path: "student-follow-up", component: StudentFollowUpComponent },
  { path: "student-management/:id", component: StudentHomeComponent },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  { path: "**", component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodaysComponent,
    IncomingComponent,
    HomeComponent,
    PageNotFoundComponent,
    GestionCurrentComponent,
    GestionListComponent,
    StudentRegisterComponent,
    UserManagementComponent,
    StudentListComponent,
    TeacherRegisterComponent,
    TeacherListComponent,
    UserInfoComponent,
    LoginInfoComponent,
    LoginComponent,
    TeacherInfoComponent,
    TeacherProfileComponent,
    UserInfoEditComponent,
    CourseHomeComponent,
    LogoutComponent,
    AdminRegisterComponent,
    UserInviteComponent,
    CourseListComponent,
    StudentFollowUpComponent,
    ParentListComponent,
    ParentRegisterComponent,
    ParentInfoComponent,
    UserInfoShowExtComponent,
    UserInfoEditExtComponent,
    ParentProfileComponent,
    UserInviteListComponent,
    UserFirstTimeComponent,
    CourseListAdminComponent,
    CourseAddAdminComponent,
    GestionAddAdminComponent,
    YearAddAdminComponent,
    YearListAdminComponent,
    StudentHomeComponent,
    StudentCourseComponent,
    YearCourseComponent,
    YearHomeComponent,
    StudentParentsComponent,
    TeacherManagementComponent,
    StudentManagementComponent,
    ParentManagementComponent,
    TeacherHomeComponent,
    ParentHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    ConfigurationService,
    GestionService,
    StudentsService,
    TeachersService,
    AuthService,
    LoginService,
    UsersService,
    RolesService,
    ParentsService,
    CoursesService,
    SchoolYearsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
