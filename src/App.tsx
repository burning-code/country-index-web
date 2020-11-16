import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CountryIndex from './CountryIndex';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    paddingTop: '30px',
  },
}));

function App(): React.ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Country Index</h1>
      <CountryIndex />
    </div>
  );
}

export default App;
