import { Component } from '@angular/core';
import { setTheme } from "ngx-bootstrap/utils";
import { AuthService } from "./services/auth.service";
import { RolesService } from "./services/roles.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  parentToggle = '';
  teacherToggle = '';
  userType: "";
  userName: "";
  constructor(public authSvc: AuthService, public rolesSvc: RolesService) {
    setTheme('bs4');
    this.userType = this.rolesSvc.getUserType();
    this.userName =  this.rolesSvc.getUserName();
  }
}
