import { UserList, UserDetails } from '../views';
import { Redirect } from 'react-router';

import { routes } from './constants';

interface IRedirectProps {
  to: string;
  from: string;
  exact?: boolean;
}

interface IRouteProps {
  path: string;
  exact?: boolean;
  component: any;
  redirect?: IRedirectProps;
}

const routesMap: Array<IRouteProps> = [
  {
    path: routes.list,
    exact: true,
    component: UserList,
  },
  {
    path: routes.details,
    exact: true,
    component: UserDetails,
  },
  {
    path: routes.not_found,
    component: Redirect,
    redirect: {
      to: routes.list,
      from: routes.list,
      exact: true,
    },
  },
];

export default routesMap;
