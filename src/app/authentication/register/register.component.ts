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

  public openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Nuevo usuario', 
      message
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
