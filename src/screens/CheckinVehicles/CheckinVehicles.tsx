import React, { useEffect,useState,ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import useDelayedLoading from '@/hooks/useDelayedLoading';
import { AppDispatch, RootState } from '@/store/store';
import { Container, TextField, MenuItem, Button, Typography } from '@mui/material';
import { executeVehicleCheckIn, resetCheckinVehicleState } from '@/store/vehicle/checkinVehiclesSlice';
import { ROUTES } from '@/enum';
import { SnackBar } from '@/components/SnackBar';
import { VehicleCheckIn } from '@/interfaces';
import { isValid } from '@/utils/utils';


const vehicleTypes = ['Motorcycle', 'Private', 'Crossover','SUV','Van','Truck'];
const ticketTypes = ['Value', 'VIP', 'Regular'];


const GroupParkedVehicles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const checkinVehicle = useSelector((state: RootState) => state.checkinVehicle.data);
  const isLoading = useSelector((state: RootState) => state.checkinVehicle.loading);
  const isError = useSelector((state: RootState) => state.checkinVehicle.error);
  const displayLoading = useDelayedLoading(isLoading,500);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<VehicleCheckIn>({
    name: '',
    licensePlateId: '',
    phone: '',
    vehicleType: '',
    width: '',
    height: '',
    length: '',
    ticketType: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errors, setErrors] = useState<Partial<VehicleCheckIn>>({});

  const validate = (fieldValues: Partial<VehicleCheckIn>) => {
    let temp = { ...errors };
    if ('height' in fieldValues)
      temp.height = fieldValues.height && Number(fieldValues.height) > 0 ? "" : "Height must be above 0";
    if ('width' in fieldValues)
      temp.width = fieldValues.width && Number(fieldValues.width) > 0 ? "" : "Width must be above 0";
    if ('length' in fieldValues)
      temp.length = fieldValues.length && Number(fieldValues.length) > 0 ? "" : "Length must be above 0";
    setErrors({
      ...temp
    });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    validate({ [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValid(errors)) {
      console.log(formValues)
      dispatch(executeVehicleCheckIn(formValues));
      // Add your submit logic here
    }
  };

  useEffect(() => {
     if(checkinVehicle){
      if(checkinVehicle.success){
         navigate(ROUTES.PARKING_STATUS)
         dispatch(resetCheckinVehicleState());
      }else{
        setSnackbarMessage(checkinVehicle.message);
        setOpenSnackbar(true);
      }
        
     }
     return ()=>{
        dispatch(resetCheckinVehicleState());
     }
  },[checkinVehicle])

 
 

  // if(isError){
  //   return (
  //    <NotFoundPage>
  //       <span>Users not found</span>
  //    </NotFoundPage>
  //   )
  // }


  return (
    <>
    <SnackBar 
      isOpen={openSnackbar} 
      setOpenSnackbar={setOpenSnackbar} 
      message={snackbarMessage}
      severity="error" 
    />
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" className="text-gray-300">
        Vehicle Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          sx={{ backgroundColor:'white' }}
        />

        {/* License Plate ID Input */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="License Plate ID"
          name="licensePlateId"
          value={formValues.licensePlateId}
          onChange={handleChange}
          sx={{ backgroundColor:'white' }}
        />

        {/* Phone Input */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Phone"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          sx={{ backgroundColor:'white' }}
        />

        {/* Vehicle Type Select */}
        <TextField
          select
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Vehicle Type"
          name="vehicleType"
          value={formValues.vehicleType}
          onChange={handleChange}
          sx={{ backgroundColor:'white' }}
        >
          {vehicleTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        
        {/* Width Input */}
        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Width"
          name="width"
          value={formValues.width}
          onChange={handleChange}
          inputProps={{ min: "0", step: "1" }}
          error={!!errors.width}
          helperText={errors.width}
          sx={{ backgroundColor:'white' }}
        />

        {/* Height Input */}
        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Height"
          name="height"
          value={formValues.height}
          onChange={handleChange}
          inputProps={{ min: "0", step: "1" }}
          error={!!errors.height}
          helperText={errors.height}
          sx={{ backgroundColor:'white' }}
        />

        {/* Length Input */}
        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Length"
          name="length"
          value={formValues.length}
          onChange={handleChange}
          inputProps={{ min: "0", step: "1" }}
          error={!!errors.length}
          helperText={errors.length}
          sx={{ backgroundColor:'white' }}
        />

        {/* Ticket Type Select */}
        <TextField
          select
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Ticket Type"
          name="ticketType"
          value={formValues.ticketType}
          onChange={handleChange}
          sx={{ backgroundColor:'white' }}
        >
          {ticketTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
      </form>
    </Container>
    </>
  );
};

export default GroupParkedVehicles;