import { VEHICLE_BY_PLATE } from '@/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ParkingLotActionType } from './parkingLotActionType';
import { MassageParkedVehicleResponse, ParkedVehiclesState } from '@/interfaces';



const initialState: ParkedVehiclesState<MassageParkedVehicleResponse> = { data: null, status: 'idle', error: null, loading:false };



export const fetchVehicleByPlate = createAsyncThunk<MassageParkedVehicleResponse,{ plateId: string }>(
  ParkingLotActionType.PARKING_VEHICLE_BY_PLATE,
  async ({plateId}) => {
    const response = await axios.get(`${VEHICLE_BY_PLATE}/${plateId}`);
    console.log(response.data)
    return response.data;
  }
);

const vehicleByPlateSlice = createSlice({
  name: 'vehicleByPlate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleByPlate.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchVehicleByPlate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchVehicleByPlate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch group parked vehicles';
        state.loading = false;
      });
  },
});

export default vehicleByPlateSlice.reducer;