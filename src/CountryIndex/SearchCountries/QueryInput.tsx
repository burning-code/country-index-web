import React, { useMemo } from 'react';
import debounce from 'lodash/debounce';
import TextField from '@material-ui/core/TextField';
import { ApolloError } from '@apollo/client';
import { IOnSearchTextChangeFunc } from '../types';

type Props = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onSearchTextChange: IOnSearchTextChangeFunc;
  fetching: boolean;
  setFetching: React.Dispatch<React.SetStateAction<boolean>>;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  error: ApolloError | undefined;
  loading: boolean;
};

const QueryInput: React.FC<Props> = ({
  searchText,
  setSearchText,
  onSearchTextChange,
  fetching = true,
  setFetching,
  onKeyDown,
  error,
  loading,
}) => {
  const debouncedOnSearchTextChange = useMemo(
    () => debounce(onSearchTextChange, 300),
    [onSearchTextChange]
  );

  const onChange = (text: string) => {
    setSearchText(text);
    if (fetching) debouncedOnSearchTextChange(text);
  };

  const onFocus = () => {
    setSearchText('');
    setFetching(true);
  };

  const getHelperText = () => {
    if (loading) return 'Loading...';
    if (error !== undefined) return error.message;
    return null;
  };

  return (
    <TextField
      fullWidth
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => onFocus()}
      onKeyDown={(e) => onKeyDown(e)}
      value={searchText}
      placeholder="Search countries"
      error={error !== undefined}
      helperText={getHelperText()}
    />
  );
};

export default QueryInput;
