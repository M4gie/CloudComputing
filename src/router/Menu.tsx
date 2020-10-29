import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';

export default function MenuRouter() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
}
