import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class GestionService {

  constructor(private configSvc: ConfigurationService ) {

   }

}
