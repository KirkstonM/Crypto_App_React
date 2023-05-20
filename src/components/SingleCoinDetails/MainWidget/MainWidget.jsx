import React from 'react';
import './mainwidget.css';
import { useSelector } from 'react-redux';

function MainWidget() {

  const coinData = useSelector(state => state.details.coinDetails);
  const currency = useSelector(state => state.coins.currentCurrency);
  const currencyicon = useSelector(state => state.coins.currencyIcon);


  const Market_cap = ((coinData.market_data?.current_price?.[currency]) * coinData.market_data?.circulating_supply);
  const Diluted_value = (coinData.market_data?.fully_diluted_valuation?.[currency]);
  const Total_volume = coinData.market_data?.total_volume?.[currency];
  const Current_Price = coinData.market_data?.current_price?.[currency];
  const Cap_Percentage = coinData.market_data?.market_cap_change_percentage_24h_in_currency?.[currency];


  return (
    <>
      {(typeof coinData.market_data != 'undefined') ?
        (<>
          <div className='rank-tab mb-3'> Rank # {coinData.coingecko_rank} </div>
          <div className='coins-details'>
            <div className='d-flex align-items-center'>
              <img src={coinData.image.large} alt={currency} style={{ width: '2.5rem' }} />
              <div className="coin-name d-flex align-items-center">
                <h3> {coinData.name} </h3>
                <h5 className='ms-2'>{coinData.symbol.toUpperCase()} </h5>
              </div>
            </div>
          </div>

          <div className='coin-value d-flex align-items-center'>
            <div> {currencyicon} {Current_Price?.toLocaleString()} </div>
            <div style={{ color: (Cap_Percentage > 0 ? 'green' : 'red'), marginLeft: '1rem' }}> {Cap_Percentage.toFixed(1)} % </div>
          </div>

          <div className='watchlist-tab mt-2'>
            {coinData.watchlist_portfolio_users?.toLocaleString()} watchlist
          </div>

          <div className='coin-price-values mb-4'>
            <div className='trade-value d-flex justify-content-between py-3'>
              <div>Market Cap</div>
              <div> {currencyicon} {Market_cap?.toLocaleString()} </div>
            </div>
            <div className='trade-value d-flex justify-content-between py-3'>
              <div>Circulating Supply</div>
              <div> {coinData.market_data.circulating_supply?.toLocaleString()} </div>
            </div>
            <div className='trade-value d-flex justify-content-between py-3'>
              <div>24 Hour Trading Vol</div>
              <div> {currencyicon} {Total_volume?.toLocaleString()} </div>
            </div>
            <div className='trade-value d-flex justify-content-between py-3'>
              <div>Total Supply</div>
              <div> {coinData.market_data.total_supply?.toLocaleString()} </div>
            </div>
            <div className='trade-value d-flex justify-content-between py-3'>
              <div>Fully Diluted Valuation</div>
              <div> {currencyicon} {Diluted_value?.toLocaleString()} </div>
            </div>
            <div className='trade-value d-flex justify-content-between py-3'>
              <div>Max Supply</div>
              <div> {coinData.market_data.max_supply?.toLocaleString()} </div>
            </div>

          </div>
        </>)
        :
        (<> </>)}
    </>
  )
}

export default MainWidget