import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private authSvc: AuthService, private loginSvc: LoginService) {}

  ngOnInit() {}
}
