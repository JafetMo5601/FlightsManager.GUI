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
    { icon: 'calendar_today', description: 'Reservar Vuelo', link: '/home/create-reservation' },
    { icon: 'pending_actions', description: 'Ver proximos vuelos', link: '/home/next-flights' },
    { icon: 'local_airport', description: 'Vuelos Reservados', link: '/home/reservations' }
  ];

  constructor(
    private authService: AuthenticationService,
    private tokenStg: TokenStorageService
    ) { }

  logout() {
    this.authService.logout();
  }

}
