import React from 'react';
import './statswidget.css';
import { useSelector } from 'react-redux';

function StatsWidget() {

  const coinData = useSelector(state => state.details.coinDetails);
  const currency = useSelector(state => state.coins.currentCurrency);
  const currencyicon = useSelector(state => state.coins.currencyIcon);

  const CAP = (coinData.market_data?.total_volume?.[currency] / coinData.market_data?.market_cap?.[currency]).toFixed(2)
  return (

    <section className='stat-widget p-3'>
      <h3 className='mb-5 p-2'>{coinData.symbol} PRICE STATISTICS</h3>

      {(typeof coinData.market_data != "undefined") ?
        (<>
          <div className='stat-container d-flex justify-content-between pb-3 mb-3 '>
            <div>Bitcoin Price</div>
            <div>{currencyicon}
              {(coinData.market_data.current_price[currency]).toLocaleString()}
            </div>
          </div>
          <div className='stat-container d-flex justify-content-between pb-3 mb-3'>
            <div>24h Low</div>
            <div>
              {currencyicon} {(coinData.market_data.low_24h[currency]).toLocaleString()}
            </div>
          </div>
          <div className='stat-container d-flex justify-content-between pb-3 mb-3'>
            <div>24h High</div>
            <div>
              {currencyicon}  {currencyicon} {(coinData.market_data.high_24h[currency]).toLocaleString()}
            </div>
          </div>
          <div className='stat-container d-flex justify-content-between pb-3 mb-3'>
            <div>Trading Volume </div>
            <div>{(coinData.market_data.total_volume[currency]).toLocaleString()}</div>
          </div>
          <div className='stat-container d-flex justify-content-between pb-3 mb-3'>
            <div>Market Cap Rank </div>
            <div> # {coinData.market_data.market_cap_rank}</div>
          </div>
          <div className='stat-container d-flex justify-content-between pb-3 mb-3'>
            <div>Market Cap</div>
            <div> {currencyicon} {(coinData.market_data.market_cap[currency]).toLocaleString()}</div>
          </div>
          <div className='stat-container d-flex justify-content-between pb-3 mb-3'>
            <div>Volume / Market Cap</div>
            <div>{CAP}</div>
          </div>
        </>) :

        (<></>)}

    </section>
  )
}

export default StatsWidget