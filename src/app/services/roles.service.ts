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

  isParent() {
    if (this.userInfo) {
      return this.userInfo.userType == "parent";
    }
    return false;
  }

  reloadUser() {
    this.userInfo = {};
    this.usersSvc.getCurrentUser().subscribe(res => this.userInfo = res);
  }
  
  isAdmin() {
    if (this.userInfo) {
      return this.userInfo.userType == "admin";
    }
    return false;
  }
}
