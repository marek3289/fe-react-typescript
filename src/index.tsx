import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Layout } from './components';
import routesMap from './router';
import store from './store/store';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <Switch>
          {routesMap.map((route, i) => (
            <Route {...route} key={i} />
          ))}
        </Switch>
      </Layout>
    </Provider> 
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot !== undefined) {
  module.hot.accept();
}
