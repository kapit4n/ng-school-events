import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {RolesService} from '../../../services/roles.service';
import {AuthService} from '../../../services/auth.service';
import {ParentsService} from '../../../services/parents.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {

  sons: any;
  sonNotifications: any;
  constructor(config: NgbDropdownConfig,
              public authSvc: AuthService,
              public rolesSvc: RolesService,
            public parentsSvc: ParentsService) { }

  ngOnInit() {
    setTimeout(() => {
    if (this.rolesSvc.getUserType() == "parent") {
      this.parentsSvc.getSons(this.rolesSvc.getParentId()).subscribe(
          sons =>
            this.parentsSvc.getSonsNotifications(sons).subscribe(result => {
              this.sonNotifications = result.filter( noti => noti.notifications.length > 0);
            })
        );
      }
    }, 1000);
  }

}
