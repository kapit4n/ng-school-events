import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { AuthService } from "../../services/auth.service";
import { RolesService } from "../../services/roles.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  
  loginInfo: any;
  constructor(private router: Router, private location: Location, private authSvc: AuthService, private loginSvc: LoginService, private rolesSvc: RolesService) {
    this.loginInfo = {};
  }

  ngOnInit() {}

  onLogin() {
    this.loginSvc.login(this.loginInfo).subscribe( userData => {
      this.authSvc.saveSessionInfo(userData);
      this.rolesSvc.reloadUser();
        window.location.href = ""; // reload the entire page to reload services
    });
  }

}
