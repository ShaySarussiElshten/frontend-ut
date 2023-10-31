import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchParkedVehicles } from '@/store/parkingLot/parkedVehiclesSlice';
import { AppDispatch, RootState } from '@/store/store';
import { ParkingStatusTable } from './components/ParkingStatusTable';


const ParkingStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const parkedVehicles = useSelector((state: RootState) => state.getParkedVehicles.data);

  useEffect(() => {
    dispatch(fetchParkedVehicles()) 
  }, [dispatch]);

 
  return (     
    <>
      <div className="bg-gray-900 py-10">
        <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest activity</h2>
        <ParkingStatusTable parkedVehicles={parkedVehicles}/>
      </div>

    </>
  );
};

export default ParkingStatus;