import React from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const {
    state: { keyword },
  } = useLocation();
  console.log(keyword);
  return <h1>Search</h1>;
};

export default Search;
