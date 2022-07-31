import { Aerolinea } from "./aerolinea";

export interface Avion {
    id: number,
    fabricante: string,
    tipo: string,
    capacidad: number,
    aerolinea: Aerolinea,
}
