import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {RolesService} from '../../../services/roles.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {

  constructor(config: NgbDropdownConfig,
              public authSvc: AuthService,
              public rolesSvc: RolesService) { }

  ngOnInit() {
  }

}
