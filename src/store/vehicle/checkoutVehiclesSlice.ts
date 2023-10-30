import { VEHICLE_CHECK_OUT } from '@/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { VehicleActionType } from './vehicleActionType';
import { MassageParkedVehicleResponse, ParkedVehiclesState } from '@/interfaces';


const initialState: ParkedVehiclesState<MassageParkedVehicleResponse> = { data: null, status: 'idle', error: null, loading:false };


export const executeVehicleCheckOut = createAsyncThunk<MassageParkedVehicleResponse,{ plateId: string }>(
  VehicleActionType.VEHICLE_CHECK_OUT,
  async ({plateId}) => {
    const response = await axios.post(VEHICLE_CHECK_OUT, { licensePlateId: plateId }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data)
    return response.data;
  }
);

const checkoutVehiclesSlice = createSlice({
  name: 'checkOutVehicles',
  initialState,
  reducers: {
    resetCheckoutVehicleState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeVehicleCheckOut.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(executeVehicleCheckOut.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(executeVehicleCheckOut.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to execute vehicle Check out';
        state.loading = false;
      });
  },
});

export default checkoutVehiclesSlice.reducer;
export const { resetCheckoutVehicleState } = checkoutVehiclesSlice.actions;