import React from 'react';

import { Header } from './components/Header';
import General from './components/General';

import './styles/normalize.scss';


const App = () => {
  return (
    <>
      <Header />
      <General />
    </>
  );
}

export default React.memo(App);