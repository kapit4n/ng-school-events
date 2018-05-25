import { Injectable } from '@angular/core';
import { UsersService } from "./users.service";

@Injectable()
export class RolesService {
  userInfo: any;
  constructor(private usersSvc: UsersService) {
    this.usersSvc.getCurrentUser().subscribe(res => this.userInfo = res );
  }

  isTeacher() {
    if (this.userInfo) {
      return this.userInfo.userType == "teacher";
    }
    return false;
  }

  reloadUser() {
    this.usersSvc.getCurrentUser().subscribe(res => this.userInfo = res);
  }
  
  isAdmin() {
    if (this.userInfo) {
      return this.userInfo.userType == "admin";
    }
    return false;
  }
}
