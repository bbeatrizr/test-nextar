import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Camping from './components/Camping';
import Header from './components/Header';
import Rescued from './components/Rescued';
import Provider from './context/Context'

export default function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Route exact path="/" component={ Header} />
        <Route path="/camping" component={ Camping } />
        <Route path="/rescued" component={ Rescued } />
      </Provider>
    </BrowserRouter>
   
  );
}
