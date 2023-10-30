import { ParkedVehicle } from "./park"


export type MassageCheckInResponse = {
    success: boolean
    message: string
    vehicle: ParkedVehicle | null 
    ticketUpgradeSuggestion: string | null
}


export type MassageParkedVehicleResponse = {
    message: string
    success: boolean
    data: ParkedVehicle
}
