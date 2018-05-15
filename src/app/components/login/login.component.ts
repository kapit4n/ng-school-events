import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  
  loginInfo: any;
  constructor(private router: Router, private authSvc: AuthService, private loginSvc: LoginService) {
    this.loginInfo = {};
  }

  ngOnInit() {}

  onLogin() {
    this.loginSvc.login(this.loginInfo).subscribe( userData => {
      console.log(userData);
      this.authSvc.isAuthenticated = true;
      this.authSvc.secToken = userData.id;
      this.router.navigate(["/home"]);
    });
  }
}
