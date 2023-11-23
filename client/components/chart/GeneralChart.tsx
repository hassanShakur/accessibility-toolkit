import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useRef } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Report from '@/types/report';
import AnalyzedData from '@/types/analyzedData';

ChartJS.register(ArcElement, Tooltip, Legend);

interface propsType {
  siteData: AnalyzedData;
}

const GeneralChart = (props: propsType) => {
  console.log(props.siteData);

  const data = {
    labels: [
      'Page Info',
      'Page Structure',
      'Form Field',
      'Heading Structure',
      'Image Structure',
      'Link Structure',
    ],
    datasets: [
      {
        label: 'General Chart',
        data: [50, 0, 63.33, 100, 75, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div id='visual'>
      <div id='dough'>
        <Doughnut data={data} options={options}></Doughnut>
      </div>
    </div>
  );
};

export default GeneralChart;

