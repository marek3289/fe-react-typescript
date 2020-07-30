import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mixins } from '../styles';
import { IPreviewProps } from '../utils/interfaces';

const StyledWrapper = styled(Link)`
  ${mixins.flexColumn};
  justify-content: center;
  
  background-color: ${({ theme }) => theme.secondary};
  width: 200px;
  height: 250px;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 2px 2px 4px 4px ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.dark};
  text-decoration: none;
  transition: transform 0.1s ease-in; 
  cursor: pointer;

  :hover { transform: translateY(-5px)};
`;

const StyledAvatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

export const UserPreview: React.FC<IPreviewProps> = ({ currentUser }) => {
  const { login, avatar_url } = currentUser;

  return (
    <StyledWrapper to={`/user/${login}`}>
      <h2>{login}</h2>
      <StyledAvatar src={avatar_url} alt='user_avatar' />
    </StyledWrapper>
  )
};
