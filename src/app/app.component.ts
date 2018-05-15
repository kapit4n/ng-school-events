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

  constructor(public authSvc: AuthService) {
    setTheme('bs4');
  }
  
  logout() {
    this.authSvc.isAuthenticated = false;
  }
}
