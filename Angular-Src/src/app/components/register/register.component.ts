import { Component, OnInit } from '@angular/core';

//import the Validation Service
import { ValidateService } from '../../services/validate.service';

//import the Validation Service
import { AuthService } from '../../services/auth.service';

//import the Flash Messages Service to notify the user of an error
import { FlashMessagesService } from 'angular2-flash-messages';

import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  //inject any used services
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }
     // Register user
     this.authService.registerUser(user).subscribe(data => {
      if (data.body['success']) {
        this.flashMessage.show("You are not registered, please log in", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(['/login'])

      } else {
        this.flashMessage.show("Failed to register user", {cssClass: "alert-danger", timeout: 3000});
      }
    });
  }
}
