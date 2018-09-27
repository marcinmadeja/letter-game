import React from 'react';
import { Route } from 'react-router-dom';
import { mainRoutes } from 'routes/routes';
import MainContent from 'components/MainContent/MainContent';

const Root = () => {
  return (
    <MainContent>
      {mainRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ))}
    </MainContent>
  );
};

export default Root;
