import { GROUP_PARKED_VEHICLES, PARKING_STATUS } from '@/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ParkingLotActionType } from './parkingLotActionType';
import { ParkedVehicle, ParkedVehiclesState } from '@/interfaces';


const initialState: ParkedVehiclesState<ParkedVehicle[]> = { data: null, status: 'idle', error: null, loading:false };

export const fetchGroupParked = createAsyncThunk<ParkedVehicle[],{ groupId: string }>(
  ParkingLotActionType.PARKING_GROUP,
  async ({groupId}) => {
    const response = await axios.get(`${GROUP_PARKED_VEHICLES}?ticketType=${groupId}`);
    console.log(response.data)
    return response.data;
  }
);

const groupParkedVehiclesSlice = createSlice({
  name: 'groupParkedVehicles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupParked.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchGroupParked.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroupParked.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch group parked vehicles';
        state.loading = false;
      });
  },
});

export default groupParkedVehiclesSlice.reducer;