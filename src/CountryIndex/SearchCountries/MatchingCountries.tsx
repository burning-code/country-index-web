import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { ICountryAbstract, ISelectCountryFunc } from '../types';

type Props = {
  countries: ICountryAbstract[];
  selectCountry: ISelectCountryFunc;
  highlightedMatchingCountryIndex: number;
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '500px',
    top: '32px',
    zIndex: 9,
  },
}));

const MatchingCountries: React.FC<Props> = (props) => {
  const { countries, selectCountry, highlightedMatchingCountryIndex } = props;
  const classes = useStyles();

  const renderCountrySuggestion = (
    suggestion: ICountryAbstract,
    index: number
  ) => {
    return (
      <MenuItem
        key={suggestion.alpha2Code}
        onClick={() => selectCountry(suggestion)}
        selected={index === highlightedMatchingCountryIndex}
      >
        {suggestion.name}
      </MenuItem>
    );
  };

  return (
    <Paper className={classes.root}>
      {countries.map(renderCountrySuggestion)}
    </Paper>
  );
};

export default MatchingCountries;
