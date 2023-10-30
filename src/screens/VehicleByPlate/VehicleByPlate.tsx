import React, { useEffect,useState, ChangeEvent  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDelayedLoading from '@/hooks/useDelayedLoading';
import { AppDispatch, RootState } from '@/store/store';
import Box from '@mui/material/Box';
import { fetchVehicleByPlate } from '@/store/parkingLot/vehicleByPlateSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardVehicleInfo } from '@/components/CardVehicleInfo';



const VehicleByPlate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vehicleByPlate = useSelector((state: RootState) => state.vehicleByPlate.data);
  const isLoading = useSelector((state: RootState) => state.vehicleByPlate.loading);
  const isError = useSelector((state: RootState) => state.vehicleByPlate.error);
  const displayLoading = useDelayedLoading(isLoading,500);
  const [inputValue, setInputValue] = useState(vehicleByPlate && vehicleByPlate.success ? vehicleByPlate.data.licensePlateId :'');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value as string); 
  };

  const handleButtonClick = () => {
    dispatch(fetchVehicleByPlate({plateId:inputValue}))
  };

  console.log(vehicleByPlate)

 
 

  // if(isError){
  //   return (
  //    <NotFoundPage>
  //       <span>Users not found</span>
  //    </NotFoundPage>
  //   )
  // }


  return (    
    <> 
     <Container>
      <Grid 
        container 
        direction="column"   
        justifyContent="center" 
      >
        <Typography variant="h4" gutterBottom align="center" className="text-sm text-gray-300">
          Serach vehicle by plate id
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
            Serach
          </Button>
        </Box>
      </Grid>
      <CardVehicleInfo vehicleInfo={vehicleByPlate} />
    </Container>
    </>
  );
};

export default VehicleByPlate;