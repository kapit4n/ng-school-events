import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private configSvc: ConfigurationService) {
    
  }

  ngOnInit() {
    this.configSvc.getConfig().subscribe(res => console.log(res));
  }
}
