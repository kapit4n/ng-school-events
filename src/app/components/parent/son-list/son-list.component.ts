import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";

@Component({
  selector: 'app-son-list',
  templateUrl: './son-list.component.html',
  styleUrls: ['./son-list.component.css']
})
export class SonListComponent implements OnInit {

  sons = [];
  constructor(private parentsSvc: ParentsService) { }

  ngOnInit() {
        this.parentsSvc.getSons().subscribe(
      sons =>
        (this.sons = sons.map(son => {
          return {
            id: son.id,
            routeLink: "./../../../parent/son/" + son.id,
            student: son.student
          };
        }))
    );
  }

}
