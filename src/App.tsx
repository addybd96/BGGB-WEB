import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

const App: React.FC = (props: any) => {

  

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}


export default App;
