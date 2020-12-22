import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  CredentialsUsed = false;

  constructor(
    private http: HttpClient,
    private flashMessage: FlashMessagesService
  ) {}

  //service method for registering a user
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post<any>('http://localhost:3000/users/register', user, {
        headers: headers,
      })
      .pipe(
        map((res: HttpResponse<JSON>) => res),
      );
  }
  //service method for logging in
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post<any>('http://localhost:3000/users/authenticate', user, {
        headers: headers,
      })
      .pipe(
        map((res: HttpResponse<JSON>) => res),
      );
  }

  //service method for getting a logged in users profiler
  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http
      .get('http://localhost:3000/users/profile', { headers: headers })
      .pipe(map((res: HttpResponse<JSON>) => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    this.loadToken();
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.authToken); //False if Token is good, True if not good
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  //clears local storage
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}