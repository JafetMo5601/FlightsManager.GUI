import { Countries } from "./countries"
import { User } from "./user"
import { Vuelo } from "./vuelo"

export interface Reservations {
    id: number,
    vuelo: Vuelo,
    pasajero: User
}
