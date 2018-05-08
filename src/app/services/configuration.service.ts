import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigurationService {
  constructor(private http: Http) {
    var obj;
    this.getConfig().subscribe(data => (obj = data), error => console.log(error));
  }

  public getConfig(): Observable<any> {
    return this.http.get("assets/config.json");
  }
}
