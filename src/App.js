import React from 'react';

import { Header } from './components/Header';
import General from './components/General';

const App = () => {
  return (
    <>
      <Header />
      <General />
    </>
  );
}

export default React.memo(App);