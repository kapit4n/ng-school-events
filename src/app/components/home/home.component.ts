import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { AuthService } from "../../services/auth.service";
import { RolesService } from "../../services/roles.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  constructor(private configSvc: ConfigurationService, public authSvc: AuthService, public rolesSvc: RolesService) {

  }

  ngOnInit() {
    this.configSvc.getConfig().subscribe(res => console.log(res));
  }


}
