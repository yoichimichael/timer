import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
  },
  body: {
    width: theme.spacing(100),
  },
  display: {
    height: theme.spacing(35),
    border: '4px solid #1124fb',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(4, 9),
    '& > Button': {
      fontSize: theme.spacing(3),
    }
  },
  increment: {
    backgroundColor: '#e2e2e2',
    color: 'black',
  }
}))

function convertSecondsToTimeDisplay(seconds){
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}



function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    let intervalID;
    if (seconds > 0) {
      intervalID = setInterval(() => {
        if (isRunning) {
          const currTime = Date.now()
          const difference = currTime - dateTime;
          console.log({difference})
          setSeconds(prev => prev - Math.floor(difference / 1000));
          setDateTime(currTime);
        }
      }, 1000)
    }
    return () => clearInterval(intervalID);
  }, [isRunning, seconds])

  function addTime(e){
    setSeconds(prev => {
      if (e.target.dataset.type === 'm') {
        if (seconds + 60 > 5940) return 5940;
        if (seconds < 5940) return prev + 60;
      } else {
        if (seconds + 5 > 5940) return 5940;
        if (seconds < 5940) return prev + 5;
      }
      return prev;
    })
  }

  function startTimer(){
    if (seconds > 0) {
      setDateTime(Date.now());
      setIsRunning(true);
    }
  }

  function stopTimer(){
    setIsRunning(false);
  }

  function resetTimer(){
    setSeconds(0);
    setIsRunning(false);
  }

  console.log({isRunning, seconds})
  return (
    <Box className={classes.root}>
      <Box className={classes.body}>
        <Box className={classes.display} style={isRunning && seconds === 0 ? { borderColor: 'orange' } : null}>
          <Typography variant="h1" component="h1">{convertSecondsToTimeDisplay(seconds)}</Typography>
        </Box>
        <Box className={classes.controls}>
          <Button variant="contained" data-type={"m"} onClick={addTime} className={classes.increment}>+1 Min</Button>
          <Button variant="contained" data-type={"s"} onClick={addTime} className={classes.increment}>+5 Sec</Button>
          <Button variant="contained" color="primary" onClick={isRunning ? stopTimer : startTimer}>{isRunning ? 'Pause' : 'Start'}</Button>
          <Button variant="contained" color="secondary" onClick={resetTimer}>Reset</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
