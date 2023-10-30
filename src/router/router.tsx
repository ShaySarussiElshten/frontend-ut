import {
    Routes, Route, 
  } from 'react-router-dom';

import Screens from '../screens';
import { ROUTES } from '@/enum';
  

  
  function Router() {
    return (
      <Routes>
        <Route path={ ROUTES.PARKING_STATUS } element={ <Screens.ParkingStatusScreen /> } />
        <Route path={ ROUTES.GROUP_PARKED_VEHICLES } element={ <Screens.GroupParkedVehicles /> } />
        <Route path={ ROUTES.VEHICLE_BY_PLATE } element={ <Screens.VehicleByPlate /> } />
        <Route path={ ROUTES.CHECKIN_VEHICLES } element={ <Screens.CheckinVehicles /> } />
        <Route path={ ROUTES.CHECKOUT_VEHICLES } element={ <Screens.CheckoutVehicles /> } />
        <Route path="*" element={ <Screens.ParkingStatusScreen /> } /> 
      </Routes>
    );
  }
  
  export default Router;