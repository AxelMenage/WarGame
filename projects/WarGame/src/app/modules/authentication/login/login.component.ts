import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor() {}
  loginform = true;
  recoverform = false;

  onDisplayConnection(show: boolean) {
    this.loginform = show;
    this.recoverform = !show;
  }
}
