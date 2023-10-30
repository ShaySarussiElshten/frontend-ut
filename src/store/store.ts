import { configureStore } from '@reduxjs/toolkit';
import apiResponseMiddleware from './middleware/apiMiddleware';
import { useDispatch } from 'react-redux'
import parkedVehiclesReducer from './parkingLot/parkedVehiclesSlice';
import groupParkedReducer from './parkingLot/groupParkedVehiclesSlice';
import vehicleByPlateReducer from './parkingLot/vehicleByPlateSlice';
import checkinVehicleReducer from './vehicle/checkinVehiclesSlice';
import checkoutVehiclesReducer from './vehicle/checkoutVehiclesSlice'

const store = configureStore({
  reducer: {
    getParkedVehicles: parkedVehiclesReducer,
    groupParkedVehicles: groupParkedReducer,
    vehicleByPlate: vehicleByPlateReducer,
    checkinVehicle:checkinVehicleReducer,
    checkoutVehicle:checkoutVehiclesReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiResponseMiddleware)
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;