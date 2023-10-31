import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

type SnackBarProps ={
    isOpen:boolean,
    message: string
    setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>
    severity: AlertColor
}


const SnackBar = ({isOpen,message,setOpenSnackbar,severity}:SnackBarProps) => {

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
      <Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar