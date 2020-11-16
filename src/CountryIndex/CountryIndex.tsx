import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import SearchCountries from './SearchCountries';
import CountryDetails from './CountryDetails';
import { ICountryAbstract } from './types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 5px',
    [theme.breakpoints.up('md')]: {
      width: '500px',
      padding: 0,
    },
  },
}));

export default function CountryIndex() {
  const [
    selectedCountry,
    setSelectedCountry,
  ] = useState<ICountryAbstract | null>(null);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SearchCountries selectCountry={setSelectedCountry} />
        </Grid>
        {selectedCountry && (
          <Grid item>
            <CountryDetails selectedCountry={selectedCountry} />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
