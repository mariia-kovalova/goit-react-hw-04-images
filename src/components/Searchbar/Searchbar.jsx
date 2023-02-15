import { useState } from 'react';
import { SearchIcon } from 'components/SearchIcon';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Input,
  Label,
  SeachBtn,
  SearchbarStyled,
  SearchForm,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === '') return toast.error('Enter your query.');
    onSubmit(inputValue);
    resetForm();
  }

  function handleChange({ target }) {
    setInputValue(target.value);
  }

  function resetForm() {
    setInputValue('');
  }

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={handleSubmit}>
        <SeachBtn type="submit">
          <Label>Search</Label>
          <SearchIcon />
        </SeachBtn>

        <Input
          className="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={inputValue}
        />
      </SearchForm>
    </SearchbarStyled>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
