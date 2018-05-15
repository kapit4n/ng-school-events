import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isAuthenticated: boolean;
  secToken: string;
  
  constructor()
  {
    this.isAuthenticated = false;
    this.secToken = "";
  }

}
