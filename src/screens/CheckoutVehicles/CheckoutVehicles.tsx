import React, { useEffect,useState, ChangeEvent  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDelayedLoading from '@/hooks/useDelayedLoading';

import { AppDispatch, RootState } from '@/store/store';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { executeVehicleCheckOut, resetCheckoutVehicleState } from '@/store/vehicle/checkoutVehiclesSlice';
import { SnackBar } from '@/components/SnackBar';
import { CardVehicleInfo } from '@/components/CardVehicleInfo';



const CheckoutVehicles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const checkoutVehicle = useSelector((state: RootState) => state.checkoutVehicle.data);
  const isLoading = useSelector((state: RootState) => state.checkoutVehicle.loading);
  const isError = useSelector((state: RootState) => state.checkoutVehicle.error);
  const displayLoading = useDelayedLoading(isLoading,500);
  const [inputValue, setInputValue] = useState(checkoutVehicle && checkoutVehicle.success ? checkoutVehicle.data.licensePlateId :'');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value as string); 
  };

  const handleButtonClick = () => {
    dispatch(executeVehicleCheckOut({plateId:inputValue}))
  };


  useEffect(() => {
    if(checkoutVehicle){
     if(checkoutVehicle.success){
       setSnackbarMessage("Hello, the payment has been made in the successfully. Thank you");
       setOpenSnackbar(true);
     }
       
    }
  },[checkoutVehicle])


  useEffect(() => {
      dispatch(resetCheckoutVehicleState())
  },[])
 
 
  return (    
    <> 
    <SnackBar 
      isOpen={openSnackbar} 
      setOpenSnackbar={setOpenSnackbar} 
      message={snackbarMessage}
      severity="success" 
    />
     <Container>
      <Grid 
        container 
        direction="column"   
        justifyContent="center" 
      >
        <Typography variant="h4" gutterBottom align="center" className="text-sm text-gray-300">
          Check out Vehicle
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 3 }}>
          <TextField
            sx={{ backgroundColor:'white',minWidth: 200 }} 
            label="Enter plate id" 
            variant="outlined" 
            value={inputValue} 
            onChange={handleInputChange} 
          />
          <Button 
            disabled={inputValue.length < 1}
            variant="contained" 
            color="primary" 
            onClick={handleButtonClick}
            sx={{
              '&.Mui-disabled': {
                bgcolor: 'grey.500',
                color: '#fff'
              }
            }}
          >
            Check Out
          </Button>
        </Box>
      </Grid>
      <CardVehicleInfo vehicleInfo={checkoutVehicle} />
    </Container>
    </>
  );
};

export default CheckoutVehicles;