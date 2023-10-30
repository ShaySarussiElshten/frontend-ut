import { PARKING_STATUS } from '@/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ParkingLotActionType } from './parkingLotActionType';
import { ParkedVehicle, ParkedVehiclesState } from '@/interfaces';


const initialState: ParkedVehiclesState<ParkedVehicle[]> = { data: null, status: 'idle', error: null, loading:false };


export const fetchParkedVehicles = createAsyncThunk<ParkedVehicle[]>(
  ParkingLotActionType.PARKING_STATUS,
  async () => {
    const response = await axios.get(PARKING_STATUS);
    console.log(response.data)
    return response.data;
  }
);

const parkedVehiclesSlice = createSlice({
  name: 'groupParkedVehicles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParkedVehicles.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchParkedVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchParkedVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch parked vehicles';
        state.loading = false;
      });
  },
});

export default parkedVehiclesSlice.reducer;