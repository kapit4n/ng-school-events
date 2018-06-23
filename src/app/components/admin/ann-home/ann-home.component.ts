import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AnnsService } from "../../../services/anns.service";

@Component({
  selector: 'app-ann-home',
  templateUrl: './ann-home.component.html',
  styleUrls: ['./ann-home.component.css']
})
export class AnnHomeComponent implements OnInit {

  annId = "";
  ann: any;
  constructor(private route: ActivatedRoute, private annsSvc: AnnsService) {
      this.ann = {};
  }

  ngOnInit() {
    this.annId = this.route.snapshot.paramMap.get("id");
    this.annsSvc.getAnn(this.annId).subscribe( ann => {
      this.ann = ann;
    });
  }
}
