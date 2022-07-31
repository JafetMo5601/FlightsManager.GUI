import { Asientos } from "./asientos";

export interface Tarifa {
    id: number,
    clase: string,
    precio: number,
    asiento: Asientos
}
