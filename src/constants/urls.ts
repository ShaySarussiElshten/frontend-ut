const url = import.meta.env.VITE_API_URL

export const PARKING_STATUS = `${url}/ParkingLot/status`  
export const GROUP_PARKED_VEHICLES = `${url}/ParkingLot/group-parked-vehicles` 
export const VEHICLE_BY_PLATE = `${url}/ParkingLot/vehicle-by-plate` 
export const VEHICLE_CHECK_IN = `${url}/vehicles/checkin` 
export const VEHICLE_CHECK_OUT = `${url}/vehicles/checkout` 