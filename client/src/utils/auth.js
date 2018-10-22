import { observer, inject } from 'mobx-react';
import { Redirect, withRouter } from 'react-router-dom';
import React from 'react';

export const withAuthentication = (Component) =>
  withRouter(inject('userStore')(observer(({ userStore, ...restProps }) => {
    const from = restProps.location;

    return userStore.currentUser 
      ? <Component {...restProps} />
      : <Redirect to={{
        pathname: '/login',
        state: { from }
      }}
      />;
  })));