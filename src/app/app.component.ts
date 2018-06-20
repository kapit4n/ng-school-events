import { Component } from '@angular/core';
import { setTheme } from "ngx-bootstrap/utils";
import { AuthService } from "./services/auth.service";
import { RolesService } from "./services/roles.service";
import { ParentsService } from "./services/parents.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  parentToggle = "";
  teacherToggle = "";
  userType: "";
  userName: "";

  sons = [];

  constructor(
    public authSvc: AuthService,
    public rolesSvc: RolesService,
    public parentsSvc: ParentsService,
    private location: Location,
    private router: Router
  ) {
    setTheme("bs4");
    this.userType = this.rolesSvc.getUserType();
    this.userName = this.rolesSvc.getUserName();

    console.log(this.location.path());  
    console.log(this.location.path());  
    console.log(this.location.path());  
    console.log(this.location.path());  
    console.log(this.location.path());  

    setTimeout(() => {
      if (rolesSvc.isParent()) {
        parentsSvc.getSons().subscribe(sons => (this.sons = sons.map(son => {
          return {id: son.id, routeLink: "parent/son/" + son.id, student: son.student};
        })));
      }
    }, 500);
  }

}
