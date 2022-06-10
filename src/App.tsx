import React from 'react';
import root from 'react-shadow/styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { applyPolyfills, defineCustomElements } from 'blip-ds/loader';

import { AppProvider } from './contexts/app-context';

import { Home } from './pages/home';

import GlobalStyle from './globalStyles';

export const App = () => {
  applyPolyfills().then(() => {
    defineCustomElements(window);
  });

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <root.div style={{ height: '100%' }}>
        <AppProvider>
          <Router>
            <Switch>
              <Route
                path="/"
                component={Home}
              />
            </Switch>
          </Router>
        </AppProvider>
      </root.div>
    </>
  );
};
