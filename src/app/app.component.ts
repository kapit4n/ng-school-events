import { Component } from '@angular/core';
import { setTheme } from "ngx-bootstrap/utils";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isAuthenticated: boolean; 
  constructor(private authSvc: AuthService) {
    setTheme('bs4');
    this.isAuthenticated = authSvc.isAuthenticated;
  }
  
  logout() {
    this.isAuthenticated = false;
    this.authSvc.isAuthenticated = false;
  }
}
