import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { CustomPopUpService } from 'src/app/shared/components/custom-pop-up/custom-pop-up.service';
import { CountriesService } from 'src/app/shared/http-services/utils/countries.service'
import { FlightsService } from 'src/app/shared/http-services/utils/flights.service';
import { Countries } from 'src/app/shared/interfaces/countries';
import { Horario } from 'src/app/shared/interfaces/horario';
import { Tarifa } from 'src/app/shared/interfaces/tarifa';
import { Vuelo } from 'src/app/shared/interfaces/vuelo';


@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.css']
})
export class FlightReservationsComponent implements OnInit {
  paisPartida: FormControl<string | null> = new FormControl('');
  paisLlegada: FormControl<string | null> = new FormControl('');
  paises: Countries[] = [];
  paisesFiltered: Countries[] = [];
  filteredOptions: Observable<Countries[]> | undefined = undefined;
  filteredAgainOptions: Observable<Countries[]> | undefined = undefined;
  displayedColumns: string[] = ['airport_departure', 'airport_arrival', 'avion', 'class', 'price'];
  selectedClass: number = 0;
  selectedSchedule: number = 0;
  
  tarifas: Tarifa[] = [];
  horarios: Horario[] = [];

  flights: Vuelo[] = [];
  dataSource = new MatTableDataSource(this.flights);

  constructor(
    private customPopUpService: CustomPopUpService,
    private countryService: CountriesService,
    private flightService: FlightsService
  ) { }

  ngOnInit() {
    this.countryService.getCountries().subscribe(
      data => {
        this.paises = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo los paises, contacte a los administradores.');
      }
    )

    this.flightService.getNextFlights().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
      },
      err => {}
    )

    this.flightService.getHorarios().subscribe(
      data => {
        this.horarios = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo los horarios, contacte a los administradores.');
      }
    )

    this.flightService.getTarifas().subscribe(
      data => {
        this.tarifas = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo las tarifas, contacte a los administradores.');
      }
    )
    
    this.filteredOptions = this.paisPartida.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredAgainOptions = this.paisLlegada.valueChanges.pipe(
      startWith(''),
      map(value => this._secondFilter(value || '')),
    );
  }

  printValues() {
    console.log(this.paisLlegada.getRawValue());
    console.log(this.paisPartida.getRawValue());
    console.log(this.selectedSchedule);
    console.log(this.selectedClass);
  }

  private _filter(value: string): Countries[] {
    const filterValue = value.toLowerCase();

    return this.paises.filter(pais => pais.nombre.toLowerCase().includes(filterValue));
  }

  private _secondFilter(value: string): Countries[] {
    const filterValue = value.toLowerCase();

    return this.paisesFiltered.filter(pais => pais.nombre.toLowerCase().includes(filterValue));
  }

  loadCountriesToArrive() {
    this.countryService.getCountriesFiltered(this.paisPartida.value!).subscribe(
      data => {
        this.paisesFiltered = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo los paises, contacte a los administradores.');
      }
    )
  }

  public openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Reservaciones', 
      message
      );
  }
}
