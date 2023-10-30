import { VEHICLE_CHECK_IN } from '@/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { VehicleActionType } from './vehicleActionType';
import { ParkedVehiclesState, VehicleCheckIn } from '@/interfaces';
import { MassageCheckInResponse } from '@/interfaces/response';




const initialState: ParkedVehiclesState<MassageCheckInResponse> = { data: null, status: 'idle', error: null, loading:false };



export const executeVehicleCheckIn = createAsyncThunk<MassageCheckInResponse, VehicleCheckIn>(
    VehicleActionType.VEHICLE_CHECK_IN,
    async (formData) => {
      const response = await axios.post(VEHICLE_CHECK_IN, formData);
      console.log(response.data);
      return response.data;
    }
  );

const checkinVehiclesSlice = createSlice({
  name: 'checkInVehicles',
  initialState,
  reducers: {
    resetCheckinVehicleState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeVehicleCheckIn.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(executeVehicleCheckIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(executeVehicleCheckIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to execute Vehicle Check In';
        state.loading = false;
      });
  },
});

export default checkinVehiclesSlice.reducer;
export const { resetCheckinVehicleState } = checkinVehiclesSlice.actions;