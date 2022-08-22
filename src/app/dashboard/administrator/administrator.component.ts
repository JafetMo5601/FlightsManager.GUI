import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { CustomPopUpService } from 'src/app/shared/components/custom-pop-up/custom-pop-up.service';
import { FlightsService } from 'src/app/shared/http-services/utils/flights.service';
import { Aeropuerto } from 'src/app/shared/interfaces/aeropuerto';
import { Avion } from 'src/app/shared/interfaces/aviones';
import { Countries } from 'src/app/shared/interfaces/countries';
import { Horario } from 'src/app/shared/interfaces/horario';
import { Tarifa } from 'src/app/shared/interfaces/tarifa';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  // Add airports instead of countries
  // Add aviones
  
  aeropuertos: Aeropuerto[] = [];
  tarifas: Tarifa[] = [];
  horarios: Horario[] = [];
  planes: Avion[] = [];

  airportsFiltered: Countries[] = [];
  filteredOptions: Observable<Countries[]> | undefined = undefined;
  filteredAgainOptions: Observable<Countries[]> | undefined = undefined;
  
  selectedClass: number = 0;
  selectedSchedule: number = 0;
  selectedPlane: number = 0;
  selectedDepartureAirport: number = 0;
  selectedArrivalAirport: number = 0;
  departureAirport: FormControl<string | null> = new FormControl('');
  arrivalAirport: FormControl<string | null> = new FormControl('');
  
  


  constructor(
    private customPopUpService: CustomPopUpService,
    private flightService: FlightsService) {}

  extractIds() {
    this.aeropuertos.forEach((aeropuerto) => {
      if (aeropuerto.nombre === this.departureAirport.value) {
        this.selectedDepartureAirport = aeropuerto.id;
      }

      if (aeropuerto.nombre === this.arrivalAirport.value) {
        this.selectedArrivalAirport = aeropuerto.id;
      }
    });
  }

  ngOnInit() {
    this.flightService.getAeropuertos().subscribe(
      data => {
        this.aeropuertos = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo los aeropuertos, contacte a los administradores.', '/home');
      }
    )

    this.flightService.getHorarios().subscribe(
      data => {
        this.horarios = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo los horarios, contacte a los administradores.', '/home');
      }
    )

    this.flightService.getTarifas().subscribe(
      data => {
        this.tarifas = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo las tarifas, contacte a los administradores.', '/home');
      }
    )

    this.flightService.getAviones().subscribe(
      data => {
        this.planes = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo los aviones disponibles, contacte a los administradores.', '/home');
      }
    )
    
    this.filteredOptions = this.departureAirport.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredAgainOptions = this.arrivalAirport.valueChanges.pipe(
      startWith(''),
      map(value => this._secondFilter(value || '')),
    );
  }
  
  private _filter(value: string): Countries[] {
    const filterValue = value.toLowerCase();

    return this.aeropuertos.filter(aeropuerto => aeropuerto.nombre.toLowerCase().includes(filterValue));
  }

  private _secondFilter(value: string): Countries[] {
    const filterValue = value.toLowerCase();

    return this.airportsFiltered.filter(airport => airport.nombre.toLowerCase().includes(filterValue));
  }

  loadCountriesToArrive() {
    this.flightService.getAirportsFiltered(this.departureAirport.value!).subscribe(
      data => {
        this.airportsFiltered = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo los paises, contacte a los administradores.', '/home');
      }
    )
  }

  public openCustomPopUp(message: string, link: string | undefined = undefined) {
    this.customPopUpService.confirm(
      'Reservaciones', 
      message,
      link
      );
  }

  public confirmPopUp() {
    this.flightService.createFlight(
      this.selectedPlane,
      this.selectedDepartureAirport,
      this.selectedArrivalAirport,
      this.selectedSchedule,
      this.selectedClass
    ).subscribe(
      data => {
        if (data.status === 'Success') {
          this.customPopUpService.confirm(
            'Reservacion', 
            data.message,
            '/home/reservations'
            );
        } else {
          this.customPopUpService.confirm(
            'Reservacion', 
            'Hubo un problema realizando el vuelo, intente mas tarde o contacte administracion',
            '/home/reservations'
            );
        }
      }, 
      err => {
        if (err.status === 'Success') {
          this.customPopUpService.confirm(
            'Reservacion', 
            err.message,
            '/home/reservations'
            );
        } else {
          this.customPopUpService.confirm(
            'Reservacion', 
            'Hubo un problema realizando el vuelo, intente mas tarde o contacte administracion',
            '/home/reservations'
            );
        }
      }
    );
  }

  cancelPopUp() {
    this.customPopUpService.confirm(
      'Cancelacion', 
      '¿Desea cancelar la creacion del vuelo?',
      '/home'
      );
  }
}
