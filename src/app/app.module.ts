import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { ConfigurationService } from './services/configuration.service';
import { GestionService } from './services/gestion.service';
import { StudentsService } from './services/students.service';

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

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'todays', component: TodaysComponent },
  { path: 'incoming', component: IncomingComponent },
  { path: 'gestion-current', component: GestionCurrentComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'student-register', component: StudentRegisterComponent },
  { path: 'student-list', component: StudentListComponent },
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
    StudentListComponent
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
  providers: [ConfigurationService, GestionService, StudentsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
