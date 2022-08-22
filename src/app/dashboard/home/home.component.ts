import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomPopUpService } from 'src/app/shared/components/custom-pop-up/custom-pop-up.service';
import { AuthenticationService } from 'src/app/shared/http-services/authentication/authentication.service';
import { TokenStorageService } from 'src/app/shared/http-services/authorization/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = '';
  showAdmin: boolean = false;

  options: any[] = [
    { icon: 'calendar_today', description: 'Reservar Vuelo', link: '/home/create-reservation' },
    { icon: 'pending_actions', description: 'Ver proximos vuelos', link: '/home/next-flights' },
    { icon: 'local_airport', description: 'Vuelos Reservados', link: '/home/reservations' }
  ];

  constructor(
    private authService: AuthenticationService,
    private tokenStg: TokenStorageService,
    private customPopUpService: CustomPopUpService
    ) { }

  ngOnInit(): void {
    this.showAdmin = this.tokenStg.getUserRole() === 'Admin' ? true : false 

    if (this.showAdmin) {
      this.options.push({ icon: 'lock', description: 'Administracion', link: '/home/admin' });
    }

    this.authService.getUserInfo(this.tokenStg.getUserId()).subscribe(
      data => {
        this.name = data.name + ' ' + data.lastname
      }, 
      err => {
        if (err.status === 400) {
          this.customPopUp('Hubo un problema trayendo la informacion del usuario, por favor inicie sesion de nuevo.');
        } else if (err.status === 404){
          this.customPopUp('Hubo un problema trayendo la informacion del usuario, por favor inicie sesion de nuevo.');
        } else {
          this.customPopUp('Hubo un problema contactando el servidor, intentelo mas tarde.');
        }
      }
    )
  }

  public customPopUp(message: string) {
    this.customPopUpService.confirm(
      'Informacion de usuario', 
      message,
      undefined
      );
  }

  logout() {
    this.authService.logout();
  }

}
