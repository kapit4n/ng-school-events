import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { ConfigurationService } from './services/configuration.service';
import { GestionService } from './services/gestion.service';
import { StudentsService } from './services/students.service';
import { TeachersService } from './services/teachers.service';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';
import { UsersService } from './services/users.service';

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

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'todays', component: TodaysComponent },
  { path: 'incoming', component: IncomingComponent },
  { path: 'gestion-current', component: GestionCurrentComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'student-register', component: StudentRegisterComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'teacher-register', component: TeacherRegisterComponent },
  { path: 'teacher-list', component: TeacherListComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: AppComponent }
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
    UserInfoEditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigurationService,
    GestionService,
    StudentsService,
    TeachersService,
    AuthService,
    LoginService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
