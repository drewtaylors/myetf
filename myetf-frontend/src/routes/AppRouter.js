import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import Home from '../components/Home';
// import RecordDetails from '../components/RecordDetails';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
      {/* <Route exact path="/record/:id" component={RecordDetails} /> */}
    </BrowserRouter>
  );
};

export default Routes;
