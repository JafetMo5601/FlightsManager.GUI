import { Aeropuerto } from "./aeropuerto";
import { Asientos } from "./asientos";
import { Avion } from "./aviones";
import { Horario } from "./horario";
import { Reserva } from "./reserva";
import { Tarifa } from "./tarifa";

export interface Vuelo {
    id: number,
    avion: Avion,
    tarifa: Tarifa,
    aeropuertoDestino: Aeropuerto
    aeropuertoPartida: Aeropuerto,
    horario: Horario
}
