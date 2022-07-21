import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/components/custom-pop-up/custom-pop-up.service';
import { AuthenticationService } from 'src/app/shared/http-services/authentication/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  signUpForm = new FormGroup({
    id: new FormControl('', {
      validators: Validators.required
    }),
    username: new FormControl('', {
      validators: Validators.required
    }),
    name: new FormControl('', {
      validators: Validators.required
    }),
    lastname: new FormControl('', {
      validators: Validators.required
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    passportNumber: new FormControl('', {
      validators: Validators.required
    }),
    phone: new FormControl('', {
      validators: Validators.required
    }),
    birthDate: new FormControl(new Date(), {
      validators: Validators.required
    }),
    password: new FormControl('', {
      validators: Validators.required
    })
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private customPopUpService: CustomPopUpService,
    private authService: AuthenticationService
  ) { }

  public openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'New user', 
      message
      );
  }

  onSubmit() {

    console.log(this.signUpForm.controls['birthDate'].value!.toISOString())

    this.authService.register(
      this.signUpForm.controls['id'].value!,
      this.signUpForm.controls['username'].value!,
      this.signUpForm.controls['name'].value!,
      this.signUpForm.controls['lastname'].value!,
      this.signUpForm.controls['email'].value!,
      this.signUpForm.controls['passportNumber'].value!,
      this.signUpForm.controls['phone'].value!,
      this.signUpForm.controls['password'].value!,
      this.signUpForm.controls['birthDate'].value!.toISOString(),
      0).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.openCustomPopUp(data.message);
      },
      err => {
        console.log(err)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
