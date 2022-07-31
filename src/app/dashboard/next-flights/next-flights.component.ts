import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vuelo } from 'src/app/shared/interfaces/vuelo';


const ELEMENT_DATA: Vuelo[] = [
  {
    id: 1, 
    avion: {
      id: 1,
      fabricante: 'Fabricante',
      tipo: 'Prueba',
      capacidad: 200,
      aerolinea: {
        id: 1,
        nombre: 'Aerolinea' 
      }
    }, 
    tarifa: {
      id: 1,
      clase: 'Turista',
      precio: 200,
      asiento: {
        id: 1,
        letra: 'A',
        fila: '3'
      },
    }, 
    reserva: {
      id: 1,
      costo: 200,
      fecha: 'Fecha',
      observacion: 'Una prueba'
    },
    aeropuerto: {
      id: 1,
      nombre: 'Aeropuerto',
      pais: {
        id: 1,
        nombre: 'Costa Rica'
      },
    },
    horario: {
      id: 1,
      horaPartida: '',
      horaLlegada: ''
    }

  }
];

@Component({
  selector: 'app-next-flights',
  templateUrl: './next-flights.component.html',
  styleUrls: ['./next-flights.component.css']
})
export class NextFlightsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['aeropuerto', 'avion', 'clase', 'precio', 'salidaPais'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
