import React, { Fragment } from 'react';
import './App.css';

import Navbar from './components/navbar/Navbar'


const App = ({ children }) => (
  <Fragment>
    <div className="container">
      <Navbar />
      {children}
    </div>
  </Fragment>
);

export default App;
