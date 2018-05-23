import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  courseId: number;
  course: any;

  constructor(private configSvc: ConfigurationService) {
    this.courseId = 1;
    this.course = {};
  }

  ngOnInit() {
    this.configSvc.getConfig().subscribe(res => console.log(res));
  }

  loadCouse(courseId: number) {
    this.courseId = courseId;
  }

}
