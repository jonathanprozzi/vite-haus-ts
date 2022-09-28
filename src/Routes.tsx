import React from 'react';
import { Routes as RoutesDom, Route } from 'react-router-dom';
import App from './App';

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<App />} />
    </RoutesDom>
  );
};

export default Routes;
