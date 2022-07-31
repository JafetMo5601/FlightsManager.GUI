import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { CustomPopUpService } from 'src/app/shared/components/custom-pop-up/custom-pop-up.service';
import { CountriesService } from 'src/app/shared/http-services/utils/countries.service';
import { Asientos } from 'src/app/shared/interfaces/asientos';
import { Countries } from 'src/app/shared/interfaces/countries';
import { Horario } from 'src/app/shared/interfaces/horario';
import { Tarifa } from 'src/app/shared/interfaces/tarifa';


@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.css']
})
export class FlightReservationsComponent implements OnInit {
  // displayedColumns: string[] = ['aeropuerto', 'avion', 'clase', 'precio', 'salidaPais'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  // applyFilter(event: Event){
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  selectedClass = 0;
  
  tarifas: Tarifa[] = [
    {  
      id: 1,
      clase: 'Turista',
      precio: 200, 
      asiento: {
        id: 1,
        letra: 'A',
        fila: '3'
      }
    },
    {  
      id: 2,
      clase: 'Ejecutivo',
      precio: 300, 
      asiento: {
        id: 1,
        letra: 'A',
        fila: '3'
      }
    }
  ];

  horarios: Horario[] = [
    {
      id: 1,
      horaPartida: "2022-08-25T07:00:00",
      horaLlegada: "2022-08-25T09:30:00"
    },
    {
      id: 2,
      horaPartida: "2022-08-25T08:00:00",
      horaLlegada: "2022-08-25T10:10:00"
    },
    {
      id: 3,
      horaPartida: "2022-08-25T09:00:00",
      horaLlegada: "2022-08-25T10:30:00"
    },
    {
      id: 4,
      horaPartida: "2022-08-25T10:00:00",
      horaLlegada: "2022-08-25T11:30:00"
    },
    {
      id: 5,
      horaPartida: "2022-08-25T11:00:00",
      horaLlegada: "2022-08-25T12:30:00"
    },
  ]

  constructor(
    private customPopUpService: CustomPopUpService,
    private countryService: CountriesService
  ) { }

  paisPartida = new FormControl('');
  paisLlegada = new FormControl('');

  paises: Countries[] = [];
  paisesFiltered: Countries[] = [];
  
  filteredOptions: Observable<Countries[]> | undefined = undefined;
  filteredAgainOptions: Observable<Countries[]> | undefined = undefined;

  ngOnInit() {
    this.countryService.getCountries().subscribe(
      data => {
        this.paises = data;
      },
      err => {
        this.openCustomPopUp('Hubo un error obteniendo los paises, contacte a los administradores.');
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
