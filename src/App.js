import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material/styles';


const useStyles = makeStyles(theme => ({
  display: {
    height: theme.spacing(35)
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(4, 9),
    '& > Button': {
      fontSize: theme.spacing(3),
      color: 'white',
    }
  } 
}))

function App() {
  
  const classes = useStyles();

  return (
    <div className="App">
      <Box className={classes.display}>
        <Typography variant="h1" component="h1"></Typography>
      </Box>
      <Box className={classes.controls}>
        <Button>+1 Minute</Button>
        <Button>Start</Button>
        <Button>Reset</Button>
      </Box>
    </div>
  );
}

export default App;
