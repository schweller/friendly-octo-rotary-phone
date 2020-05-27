import React from 'react';
import { useSelector } from 'react-redux'

import Login from 'Login'
import { RootState } from 'reducers'
import IndicatorMessages from 'IndicatorMessages'

function App() {
  const {
    isAuthenticated
  } = useSelector((state: RootState) => state.auth)

  let content
  if (isAuthenticated) {
    content = (
      <IndicatorMessages />
    )
  } else {
    content = (<Login />)
  }

  return (
    <>
      <div className="App">
        {content}
      </div>
    </>
  );
}

export default App;
