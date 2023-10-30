import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDelayedLoading from '@/hooks/useDelayedLoading';
import {  fetchParkedVehicles } from '@/store/parkingLot/parkedVehiclesSlice';
import { AppDispatch, RootState } from '@/store/store';
import { ParkingStatusTable } from './components/ParkingStatusTable';


const ParkingStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const parkedVehicles = useSelector((state: RootState) => state.getParkedVehicles.data);
  const isLoading = useSelector((state: RootState) => state.getParkedVehicles.loading);
  const isError = useSelector((state: RootState) => state.getParkedVehicles.error);
  const displayLoading = useDelayedLoading(isLoading,500);
  

  useEffect(() => {
    dispatch(fetchParkedVehicles()) 
  }, [dispatch]);

 

  // if(isError){
  //   return (
  //    <NotFoundPage>
  //       <span>Users not found</span>
  //    </NotFoundPage>
  //   )
  // }


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