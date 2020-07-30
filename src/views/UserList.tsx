import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import searchIcon from '../assets/search-icon.svg';
import spinner from '../assets/spinner.gif';
import { UserPreview } from '../components/UserPreview';
import { useObserver } from '../hooks';
import { Error, mixins } from '../styles';

import { fetchUsersAction, fetchMoreUsersAction, resetStateAction } from '../actions';
import { IUser } from '../utils/interfaces';

const StyledWrapper = styled.div`
  ${mixins.flexColumn};
  width: 100%;
  height: 100vh;
  padding: 50px 100px;

  .spinner { margin: 50px };
`;

const Header = styled.header`
  ${mixins.flexColumn};
  height: 100px;
  margin-bottom: 25px;
`;

const StyledListWrapper = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, auto));
  justify-content: center;
  width: 100%;

  a { margin: 15px };
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.secondary};
  margin: 7.5px;
`;

const Input = styled.input`
  width: 250px;
  height: 30px;
  margin: 0 10px;
  font-size: ${({ theme }) => theme.font.size.m};
  font-weight: ${({ theme }) => theme.font.weight.light};
  color: ${({ theme }) => theme.main};
  border: 1px solid ${({ theme }) => theme.gray100};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: none;

  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: 5px center;
  padding: 10px 5px 10px 28px;

  ::placeholder { color: ${({ theme }) => theme.gray100}; };
`;

export const UserList: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const { userList, page, isLoading, error } = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  const fetchUsers = React.useCallback(val => dispatch(fetchUsersAction(val)), [dispatch]);
  const resetState = React.useCallback(() => dispatch(resetStateAction()), [dispatch]);
  const fetchMoreUsers = React.useCallback(() => dispatch(fetchMoreUsersAction()), [dispatch]);

  const postPerPage: number = 50;
  const { lastElement } = useObserver(isLoading, fetchMoreUsers);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue !== '' && !isLoading) {
      resetState();
      setSearchValue(inputValue);
      fetchUsers({ search: inputValue, page: 1, postPerPage });
    } 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  React.useEffect(() => {
    if (userList.length) {
      fetchUsers({ search: searchValue, page, postPerPage });
    }
  }, [page])

  return (
    <StyledWrapper>

      <Header>
        <Heading>Find github users!</Heading>
        <form onSubmit={handleSearch}>
          <Input
            type="search" 
            name="search" 
            pattern=".*\S.*" 
            placeholder='eg. marek3289'
            value={inputValue}
            onChange={handleChange} 
          />
          <button type='submit'>Search</button>
        </form>
      </Header>

      <StyledListWrapper>
        {userList.map((user: IUser, i:number) => {
          if (userList.length === i + 1) {
            return (
              <div ref={lastElement} key={user.login}>
                <UserPreview currentUser={user} />
              </div>
            )
          }

          return (
            <div key={user.login}>
              <UserPreview currentUser={user} />
            </div>
          )
        })}
      </StyledListWrapper>

      {isLoading && <img src={spinner} className='spinner' alt='loading_spinner' />}
      {error && !isLoading && <Error>{error}</Error>}

    </StyledWrapper>
  )
};
