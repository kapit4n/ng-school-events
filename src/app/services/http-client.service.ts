import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private http: Http) {}

  get(url) {
    let headers = new Headers();
    var urlAux = url;
    if (url.indexOf("?") >= 0) {
      urlAux = url + "&access_token=" + localStorage.getItem("access_token");
    } else {
      urlAux = url + "?access_token=" + localStorage.getItem("access_token");
    }

    return this.http.get(urlAux, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    var urlAux = url;
    if (url.indexOf("?") >= 0) {
      urlAux = url + "&access_token=" + localStorage.getItem("access_token");
    } else {
      urlAux = url + "?access_token=" + localStorage.getItem("access_token");
    }
    return this.http.post(urlAux, data, {
      headers: headers
    });
  }
}
