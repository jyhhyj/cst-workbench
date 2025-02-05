import React, { useContext } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRoute from './authRoute';
import { UserContext } from '@/utils/contexts';

import LoginPage from '@/pages/loginPage';
import Layout from '@/pages/layout';
import Page404 from '@/pages/page404';
import Dashboard from '@/pages/dashboard';
import Home from '@/pages/home';

import componentObj, { flatTree } from '@/utils';

export default () => (
  <HashRouter>
    <Switch>
      <AuthRoute exact path="/login" authTo="/" component={LoginPage} />
      <AuthRoute path="/home" authTo="/login" component={Layout} />
      <Redirect from="/" to="/home" />
      <Route component={Page404} />
    </Switch>
  </HashRouter>
);


export const RouteList = ({ match }) => {
  const user = useContext(UserContext);
  return (
    <Switch>
      {
        flatTree(user.menu).filter(item => item.component).map((item, index) => (
          <Route path={`${match.path + item.path}`} key={index} component={componentObj[item.component]} />
        ))
      }
      <Route exact path={match.path} component={Home} />
      <Route component={Page404} />
    </Switch>
  );
};
