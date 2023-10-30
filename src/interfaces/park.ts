export type ParkedVehicle = {
    id: number
    name: string
    licensePlateId: string
    phone: string
    vehicleType: string
    height: number
    width: number
    length: number
    parkingLot: ParkingLot
    ticketType: string
    isOccupied?: boolean
    parkingLotId?: number
  }
  
  type ParkingLot ={
    id: number
    isOccupied: boolean
    occupiedBy: string
  }

export type ParkedVehiclesState<T> = {
    data: T | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    loading: boolean;
}