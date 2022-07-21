import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/http-services/authentication/authentication.service';
import { TokenStorageService } from 'src/app/shared/http-services/authorization/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Calendar';
  name: string = this.tokenStg.getUserName();

  options: any[] = [
    { icon: 'calendar_today', description: 'Calendar', link: '' },
    { icon: 'pending_actions', description: 'Appointments', link: '' },
    { icon: 'event', description: 'Events', link: '' },
    { icon: 'local_airport', description: 'Vacations', link: '' }
  ];

  constructor(
    private authService: AuthenticationService,
    private tokenStg: TokenStorageService
    ) { }

  logout() {
    this.authService.logout();
  }

}
