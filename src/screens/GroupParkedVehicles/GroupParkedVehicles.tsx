import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { fetchGroupParked } from '@/store/parkingLot/groupParkedVehiclesSlice';
import { GroupParkedTable } from './components/GroupParkedTable';



const GroupParkedVehicles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const groupParkedVehicles = useSelector((state: RootState) => state.groupParkedVehicles.data);
  const [group, setGroup] = useState<string>(groupParkedVehicles && groupParkedVehicles.length > 0 ? groupParkedVehicles[0].ticketType : '');

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };

  useEffect(() => {
    if(group){
      dispatch(fetchGroupParked({groupId:group}))
    }
  
  }, [group]);



  return (    
    <> 
    <Box sx={{ minWidth: 400, display:'flex', justifyContent:'center' }}>
      <FormControl sx={{ minWidth: 400, backgroundColor:'white' }}>
        <InputLabel id="demo-simple-select-label">Ticket Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={group}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'VIP'}>VIP</MenuItem>
          <MenuItem value={'Value'}>Value</MenuItem>
          <MenuItem value={'Regular'}>Regular</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <GroupParkedTable 
      groupParkedVehicles={groupParkedVehicles}
      groupToShow={group}
    />
    </>
  );
};

export default GroupParkedVehicles;