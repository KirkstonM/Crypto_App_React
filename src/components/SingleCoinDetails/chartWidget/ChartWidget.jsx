import React, { useEffect, useState } from 'react';
import './chartwidget.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChartData } from '../../../features/chartSlice';
import { Line } from 'react-chartjs-2';
import { ChartWidget as ChartJS, } from 'chart.js/auto';
import { chartDays } from './chartTabs';
import ChartLoader from './ChartLoader';


function ChartWidget(props) {

  const data = useSelector(state => state.chart.chartData);
  const currency = useSelector(state => state.coins.currentCurrency);
  const loading = useSelector(state => state.chart.isLoading);
  const dispatch = useDispatch();
  const [days, setDays] = useState(1);
  const id = props.data.id;

  useEffect(() => {
    const fetchdata = () => {
      dispatch(fetchChartData({ id, currency, days }))
    }
    fetchdata();
  }, [dispatch, days, currency, id])

  const changeDate = (number) => {
    setDays(number);
  };

  return (
    <section>
      <div className='chart-tab w-100'>
        {loading ? <ChartLoader /> :
          <Line
            data={{
              labels: data.prices?.map(coin => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12 ?
                    `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: data.prices?.map(coin => coin[1]),
                  label: `Price ( Past ${days} Day(s) ) in ${currency}`,
                  borderColor: "#EEBC1D"
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        }
      </div>
      <div className='btn-container d-flex align-item-center justify-content-evenly mt-5 p-2'>
        {chartDays.map(item => (
          <button value={item.value} onClick={() => changeDate(item.value)}> {item.label} </button>
        ))}
      </div>

    </section>
  )
}

export default ChartWidget;