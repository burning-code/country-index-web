import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ICountryAbstract, ICountryData, ICountryQuery } from '../types';

const GET_COUNTRY = gql`
  query country($code: String!) {
    country(code: $code) {
      name
      alpha2Code
      alpha3Code
      callingCodes
      capital
      altSpellings
      region
      subregion
      population
      latlng
      demonym
      area
      timezones
      nativeName
      currencies {
        code
        name
        symbol
      }
      languages {
        iso639_1
        iso639_2
        name
        nativeName
      }
      flag
      cioc
    }
  }
`;

type Props = {
  selectedCountry: ICountryAbstract;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  img: {
    display: 'block',
    width: 128,
    height: 'auto',
  },
}));

const CountryDetails: React.FC<Props> = ({ selectedCountry }) => {
  const { loading, error, data } = useQuery<ICountryData, ICountryQuery>(
    GET_COUNTRY,
    {
      variables: { code: selectedCountry.alpha2Code },
    }
  );
  const classes = useStyles();

  if (loading) return <div>Loading...</div>;
  if (data && data.country) {
    const { name, capital, population, flag, languages } = data.country;
    return (
      <Paper className={classes.paper}>
        <Grid container item justify="flex-start" spacing={2}>
          <Grid item justify="flex-start">
            <img className={classes.img} alt={name} src={flag} />
          </Grid>
          <Grid item xs={12} sm container direction="column">
            <Typography gutterBottom variant="subtitle1">
              {name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Capital: {capital}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Population: {population.toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Languages:{' '}
              {languages.map((language) => language.nativeName).join(', ')}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return null;
};

export default CountryDetails;
