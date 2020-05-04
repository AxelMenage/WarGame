import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'projects/WarGame/src/app/core/api/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent {

  @Output() displayConnection = new EventEmitter<boolean>();

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    switchToRecover(show: boolean) {
      this.displayConnection.emit(!show);
  }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            nickname: ['', Validators.required],
            password: ['', Validators.required],
            rememberme: [false]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    handleError(error) {
      if (error.error) {
        if (error.error.message) {
          return this.transformApiErrorMessage(error.error.message);
        }
      }
      return 'Connection error.';
    }

    transformApiErrorMessage(text: string) {
      return text.includes('transient failure') ? 'Network error : API couldn\'t be reached.' : text;
    }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.nickname.value, this.f.password.value, this.f.rememberme.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }

}
