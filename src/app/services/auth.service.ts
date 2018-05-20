import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private router: Router) {
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem("access_token")) {
      return localStorage.getItem("access_token").length > 10;
    }
    return false;
  }

  public setToken(token) {
    localStorage.setItem("access_token", token);
  }

  public logout() {
    localStorage.removeItem("access_token");
  }
}
