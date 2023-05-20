import React, { useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col';
import './coindescription.css';
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { cleanDetails, fetchDetails } from '../../features/coinDetailsSlice';
import { useParams } from 'react-router-dom';
import StatsWidget from '../../components/SingleCoinDetails/statsWidget/StatsWidget';
import SocialWidget from '../../components/SingleCoinDetails/socialWidget/SocialWidget';
import MainWidget from '../../components/SingleCoinDetails/MainWidget/MainWidget';
import SummaryWidget from '../../components/SingleCoinDetails/SummaryWidget/SummaryWidget';
import ChartWidget from '../../components/SingleCoinDetails/chartWidget/ChartWidget';
function CoinDescription() {

  const coinData = useSelector(state => state.details.coinDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {

    const fetch = () => {
      dispatch(fetchDetails(id))
    }

    fetch();

    return () => {
      dispatch(cleanDetails);
    }
  }, [dispatch, id])

  return (
    <div style={{ paddingTop: '4rem' }}>
      <Container>
        <Row>

          <Col xl={7} className='me-5'>
            <MainWidget />
          </Col>

          <Col xl={4}>
            <SocialWidget data={coinData} />
          </Col>

        </Row>
        <div className='row-divider'></div>
        <section className='mt-5'>
          <Row>
            <Col xl={7} className='me-5'>
              <ChartWidget data={coinData} />
            </Col >
            <Col xl={4} >
              <StatsWidget />
            </Col>
          </Row>

          <Col xl={7} className='summary-widget pb-5'>
            <SummaryWidget data={coinData} />
          </Col>

        </section>
      </Container>
    </div>

  )
}

export default CoinDescription