import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private router: Router) {
  }

  private accessTokenLabel = "access_token";

  private userIdLabel = "user_id";

  public isAuthenticated(): boolean {
    if (localStorage.getItem(this.accessTokenLabel)) {
      return localStorage.getItem(this.accessTokenLabel).length > 10;
    }
    return false;
  }

  public saveSessionInfo(user) {
    localStorage.setItem(this.accessTokenLabel, user.id);
    localStorage.setItem(this.userIdLabel, user.userId);
  }

  public logout() {
    localStorage.removeItem(this.accessTokenLabel);
    localStorage.removeItem(this.userIdLabel);
  }

  public getCurrentUserId(): string {
    return localStorage.getItem(this.userIdLabel);
  }
}
