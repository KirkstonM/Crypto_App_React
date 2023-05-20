import React, { useEffect, useState } from 'react';
import './cointable.css';
import Container from 'react-bootstrap/esm/Container';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoinData, coinValues, fiatIcon } from '../../features/coinSlice';
import Pagination from '../Pagination/Pagination';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';


function CoinTable() {

    const coinData = useSelector(coinValues);
    const dispatch = useDispatch();
    const currency = useSelector(state => state.coins.currentCurrency);
    const [filterCoin, setFilterCoin] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage] = useState(10);
    const loading = useSelector(state => state.coins.isLoading);
    const currencySymbol = useSelector(fiatIcon);

    useEffect(() => {
        const fetchData = () => {
          dispatch(fetchCoinData(currency))
        };

        fetchData();
      }, [dispatch, currency])

    //calculate indexes for pagination
    let indexOfLastPost = currentPage * coinsPerPage;
    let indexOfFirstPost = indexOfLastPost - coinsPerPage;
    const currentCoins = coinData.slice(indexOfFirstPost, indexOfLastPost);

    //change the current page
    const getSelectedPage = (number) => {
        setCurrentPage(number);
    }

    // filter function for the coins

    const filteredList = currentCoins.filter(item => {
        return filterCoin.toLowerCase() === "" ?
            item :
            item.name.toLowerCase().includes(filterCoin)
    });

    return (
        <section className='main-page py-5'>
            <Container className='home-section mt-5'>
                <div className='form-container'>
                    <input
                        id="my-input"
                        type='text'
                        placeholder='Search Coin'
                        className='form-control align-center mt-5'
                        value={filterCoin}
                        name='filterCoin'
                        onChange={(e) => setFilterCoin(e.target.value)}
                    />
                </div>

                <div className='crypto-table my-5'>
                <table>
<thead>
 <tr>
 <th> # </th>
<th id='table-name'> Name</th>
 <th> Last Price </th>
 <th> 24h Change </th>
<th id='tab'> Market Cap </th>
</tr>
</thead>
 {loading ? <Loading /> :
    (<>
     {
     filteredList.length > 0 ?
      filteredList.map(items => {
      return (
       <>
       <tbody>
       <tr key={items.id}>
     <td> {items.market_cap_rank} </td>
       <td>
     <Link to={`/coins/${items.id}`}>
   <div className='coins-details d-flex align-items-center'>
    <img src={items.image} alt={items.name} className='coin-image' />
     <div className='coin-name'>
       <div>{items.name}</div>
       <div className='coin-symbol'>{items.symbol}</div>  
       </div>
      </div>
      </Link>
     </td>
      <td> {currencySymbol} {items.current_price.toLocaleString()} </td>
       <td  style={{ color: (items.market_cap_change_percentage_24h > 0) ? 'green' : 'red' }} >
        {items.market_cap_change_percentage_24h.toFixed(1) + '%'}
         </td>
       <td id='tab'> {currencySymbol} {items.market_cap.toLocaleString()} </td>
         </tr>
         </tbody>
         </>
        )
         }) :
         ("")
        }
         </>)}
         </table>
                </div>
                {loading ? '' : <Pagination coinsPerPage={coinsPerPage} totalCoins={coinData.length} paginate={getSelectedPage} />}
                
            </Container>

        </section>
    )
}

export default CoinTable