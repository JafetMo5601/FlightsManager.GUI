import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/http-services/authentication/authentication.service';
import { TokenStorageService } from 'src/app/shared/http-services/authorization/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbModalConfig, NgbModal, AuthenticationService]
})
export class LoginComponent {

  constructor(
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    username: new FormControl<string>('', {
      validators: [
        Validators.required
      ]
    }),
    password: new FormControl<string>('', {
      validators: Validators.required
    })
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  onSubmit() {
    this.authService.authenticate(
      this.loginForm.controls['username'].value!,
      this.loginForm.controls['password'].value!).subscribe(
        data => {
          console.log(data)
          let token: any = this.get_token(data);
          //let user_data: any = this.get_user_data(data);
          this.tokenStorage.saveToken(token);
          //this.tokenStorage.saveUser(user_data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['home']);
        },
        err => {
          console.log(err)
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
  }

  get_token(data: any) {
    return data.token;
  }

  get_user_data(data: any) {
    delete data.token;
    delete data.type;
    return data;
  }
}
