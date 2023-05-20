import React from 'react';
import { PropagateLoader } from 'react-spinners';

function Loading() {

  const override = {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    margin: "0 auto",
    borderColor: "red",
    color: '#fcd535',
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  return (
    <div className='loading-screen'>
      <PropagateLoader
        color={override.color}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader" />
    </div>
  )
}

export default Loading