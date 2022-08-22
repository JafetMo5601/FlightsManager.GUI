import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/http-services/authentication/authentication.service';
import { TokenStorageService } from 'src/app/shared/http-services/authorization/token-storage.service';
import { environment } from 'src/environments/environment';
import { CustomPopUpService } from 'src/app/shared/components/custom-pop-up/custom-pop-up.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbModalConfig, NgbModal, AuthenticationService]
})
export class LoginComponent {
  token: string | undefined;

  constructor(
    private customPopUpService: CustomPopUpService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.token = undefined;
  }

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

          /*
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiam1vLnB5IiwianRpIjoiMDhmZjE5ZGUtODNmMC00MTE5LTg4ODQtOGMzMWZjNWViYjI0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTY2MTEzMjQ1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.cwsC8R92WCmvpXBtSX-9Vs9NA5qBLhh8hQ9ilznH8VY",
    "expiration": "2022-08-22T01:40:52Z",
    "role": "User",
    "emailConfirmed": false,
    "userId": "208180603"
}
           */

          if (data.token !== '' || data.token !== undefined || data.token !== null){
            let token: any = this.get_token(data);
            let role: any = this.get_userRole(data);
            let userId: any = this.get_userId(data);

            this.tokenStorage.saveToken(token);
            this.tokenStorage.saveUserId(userId);
            this.tokenStorage.saveUserRole(role);

            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.router.navigate(['home']);
          } else if (data.status === 401) {
            this.errorMessage = 'El usuario no existe.';
            this.isLoginFailed = true;
            this.openCustomPopUp(this.errorMessage);
          } else if (data.status === 500){
            this.errorMessage = 'Hubo un problema contactando el servidor, intentelo mas tarde.';
            this.isLoginFailed = true;
            this.openCustomPopUp(this.errorMessage);
          }
        },
        err => {
          if (err.status === 401) {
            this.errorMessage = 'El usuario no existe.';
            this.isLoginFailed = true;
            this.openCustomPopUp(this.errorMessage);
          } else {
            this.errorMessage = 'Hubo un problema contactando el servidor, intentelo mas tarde.';
            this.isLoginFailed = true;
            this.openCustomPopUp(this.errorMessage);
          }
        }
      );
  }

  public openCustomPopUp(message: string, link: string | undefined = undefined) {
    this.customPopUpService.confirm(
      'Inicio de sesion', 
      message,
      link
      );
  }

  get_token(data: any) {
    return data.token;
  }

  get_userId(data: any) {
    return data.userId
  }

  get_userRole(data: any) {
    return data.role
  }

  get_user_data(data: any) {
    delete data.token;
    delete data.type;
    return data;
  }

  public send(form: NgForm): void {
    if (form.invalid){
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
    console.debug(`Token [${this.token}] generated`);
  }
}
