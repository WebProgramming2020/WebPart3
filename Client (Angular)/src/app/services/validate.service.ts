import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidateService {

  constructor() { }
//make sure that all the fields have inputs
  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }
//ensures that the entered email is in the correct format
  validateEmail(email){
    //taken from StackOverFlow
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
 