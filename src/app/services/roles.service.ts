import { Injectable } from '@angular/core';
import { UsersService } from "./users.service";

@Injectable()
export class RolesService {
  userInfo: any;

  homeUrl = "/home"; 

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
    this.usersSvc.getCurrentUser().subscribe(res => {
      this.userInfo = res;
    });
  }
  
  isAdmin() {
    if (this.userInfo) {
      return this.userInfo.userType == "admin";
    }
    return false;
  }

  getUserType() {
    if (this.userInfo) {
      return this.userInfo.userType;
    }
    return "";
  }

  getUserId() {
    if (this.userInfo) {
      return this.userInfo.id;
    }
    return "";
  }

  getParentId() {
    if (this.userInfo.parents) {
      return this.userInfo.parents.id;
    }
    return "";
  }

  getParent() {
    if (this.userInfo.parents) {
      return this.userInfo.parents;
    }
    return {};
  }

  getTeacherId() {
    if (this.userInfo.teachers) {
      return this.userInfo.teachers.id;
    }
    return "";
  }

  getTeacher() {
    if (this.userInfo.teachers) {
      return this.userInfo.teachers;
    }
    return {};
  }

  getUserName() {
    if (this.userInfo) {
      if (this.userInfo.teachers) return this.userInfo.teachers.firstName;
      else if (this.userInfo.parents) return this.userInfo.parents.firstName;
    }
    return "";
  }

  
}
