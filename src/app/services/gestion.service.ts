import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";

@Injectable()
export class GestionService {
  currentGestion: any;

  constructor(private configSvc: ConfigurationService) {
    this.currentGestion = {
      year: 2018,
      startDate: "February",
      endDate: "November"
    };
  }

  getCurrentGestion() {
    return this.currentGestion;
  }
}
