import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomPopUpService } from 'src/app/shared/components/custom-pop-up/custom-pop-up.service';
import { AuthenticationService } from 'src/app/shared/http-services/authentication/authentication.service';
import { Countries } from 'src/app/shared/interfaces/countries';
import { CountriesService } from 'src/app/shared/http-services/utils/countries.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
    }),
    country: new FormControl(0, {
      validators: Validators.required
    })
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  selectedCountry = 0;
  countries: Countries[] = [];


  constructor(
    private customPopUpService: CustomPopUpService,
    private authService: AuthenticationService,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(
      data => {
        if (data.length > 0){
          this.countries = data
        } 
      },
      err => {
        if (err.status !== 200){
          this.openCustomPopUp('Hubo un error en el servidor, contacte a los administradores.');
        } 
      }
    )
  }

  public openCustomPopUp(message: string, link: string | undefined = undefined) {
    this.customPopUpService.confirm(
      'Nuevo usuario', 
      message,
      link
      );
  }

  chooseCountry() {
    this.signUpForm.controls['country'].setValue(this.selectedCountry);
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
      this.signUpForm.controls['country'].value!).subscribe(
      data => {
        if (data.status === 'Success'){
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.openCustomPopUp(data.message, 'auth');
          // window.location.reload();
        } else {
          this.errorMessage = data.error.message;
          this.openCustomPopUp('Hubo un error creando el usuario, contacte a los administradores.');
        }
      },
      err => {
        if (err.status === 500){
          this.isSuccessful = false;
          this.isSignUpFailed = true;
          if (err.error.message !== undefined || err.error.message !== null) {
            this.openCustomPopUp(err.error.message);
          } else {
            this.openCustomPopUp('Hubo un error creando el usuario, contacte a los administradores.');
          }
        } else if (err.status === 'Success'){
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.openCustomPopUp(err.message);
        } else {
          this.isSuccessful = false;
          this.isSignUpFailed = true;
          this.openCustomPopUp('Hubo un error creando el usuario, contacte a los administradores.');
        }
      }
    );
  }
}