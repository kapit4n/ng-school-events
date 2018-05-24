import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, public authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.logout();
    this.router.navigate(["/"]);
  }
}
