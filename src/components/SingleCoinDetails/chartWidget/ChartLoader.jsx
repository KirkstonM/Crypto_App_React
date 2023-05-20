import React from 'react';
import { PulseLoader } from 'react-spinners';
import './chartwidget.css';

function ChartLoader() {

  const override = {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    margin: "0 auto",
    borderColor: "red",
    color: 'red',
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 99
  };
  return (

    <div>
      <PulseLoader
        color={override.color}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

    </div>
  )
}

export default ChartLoader