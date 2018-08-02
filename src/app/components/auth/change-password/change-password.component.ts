import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from "../../../services/login.service";
import { UsersService } from "../../../services/users.service";
import { AuthService } from "../../../services/auth.service";
import { RolesService } from "../../../services/roles.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string;
  oldPassword: string;
  constructor(
    private route: ActivatedRoute,
    private loginSvc: LoginService,
    private usersSvc: UsersService,
    private authSvc: AuthService,
    private rolesSvc: RolesService) { }

  ngOnInit() {
  }

  changePassword() {
    let changPassword = { oldPassword: this.oldPassword, newPassword: this.newPassword };
    this.usersSvc.changePassword(changPassword).subscribe(passChanged => {
      let userLogin = { email: this.rolesSvc.getUserEmail(), password: this.newPassword };
      this.loginSvc
        .login(userLogin)
        .subscribe(loginInfo => {
          this.authSvc.saveSessionInfo(loginInfo);
          this.rolesSvc.reloadUser();
          window.location.href = ""; // reload the entire page to reload services
        });
    });
  }
}
