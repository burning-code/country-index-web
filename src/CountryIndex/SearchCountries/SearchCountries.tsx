import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MatchingCountries from './MatchingCountries';
import QueryInput from './QueryInput';
import {
  ICountriesData,
  ICountriesQuery,
  ICountryAbstract,
  ISelectCountryFunc,
} from '../types';

const GET_MATCHING_COUNTRIES = gql`
  query MatchingCountries($keywords: String!, $limit: Int!) {
    countries(keywords: $keywords, limit: $limit) {
      name
      alpha2Code
    }
  }
`;

type Props = {
  selectCountry: ISelectCountryFunc;
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '50px',
  },
}));

const SearchCountries: React.FC<Props> = ({ selectCountry }) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [fetching, setFetching] = useState(true);
  const [
    highlightedMatchingCountryIndex,
    setHighlightedMatchingCountryIndex,
  ] = React.useState(0);
  const { loading, error, data } = useQuery<ICountriesData, ICountriesQuery>(
    GET_MATCHING_COUNTRIES,
    {
      variables: { keywords: debouncedSearchText, limit: 5 },
    }
  );
  const classes = useStyles();

  const handleSearchTextChange = async (text: string) => {
    setDebouncedSearchText(text);
  };

  const handleSelectCountry = (country: ICountryAbstract) => {
    setFetching(false);
    setSearchText(country.name);
    setDebouncedSearchText('');
    selectCountry(country);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const ARROW_UP = 'ArrowUp';
    const ARROW_DOWN = 'ArrowDown';
    const ENTER = 'Enter';
    const INITIAL_IDX = 0;

    if (!(data && data.countries)) return;

    if (e.key === ARROW_DOWN) {
      e.preventDefault();

      const idx = highlightedMatchingCountryIndex;
      const nextIdx = idx !== undefined ? idx + 1 : INITIAL_IDX;

      if (nextIdx < data.countries.length) {
        setHighlightedMatchingCountryIndex(nextIdx);
      } else {
        setHighlightedMatchingCountryIndex(INITIAL_IDX);
      }
    }

    if (e.key === ARROW_UP) {
      e.preventDefault();

      const lastIdx = data.countries.length - 1;
      const idx = highlightedMatchingCountryIndex;
      const prevIdx = idx !== undefined ? idx - 1 : lastIdx;

      if (prevIdx >= 0) {
        setHighlightedMatchingCountryIndex(prevIdx);
      } else {
        setHighlightedMatchingCountryIndex(lastIdx);
      }
    }

    if (e.key === ENTER && highlightedMatchingCountryIndex !== undefined) {
      handleSelectCountry(data.countries[highlightedMatchingCountryIndex]);
    }
  };

  return (
    <div className={classes.root}>
      <QueryInput
        searchText={searchText}
        setSearchText={setSearchText}
        onSearchTextChange={handleSearchTextChange}
        fetching={fetching}
        setFetching={setFetching}
        onKeyDown={handleKeyDown}
        error={error}
        loading={loading}
      />
      {data && data.countries && (
        <MatchingCountries
          countries={data.countries}
          selectCountry={handleSelectCountry}
          highlightedMatchingCountryIndex={highlightedMatchingCountryIndex}
        />
      )}
    </div>
  );
};

export default SearchCountries;
