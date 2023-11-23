import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface propsType {
  accessibilityScore: number;
}

const AccessDough = (props: propsType) => {
  const accessibilityScore = props.accessibilityScore;
  const totalScore = 100;

  const data = {
    labels: ['Issues', 'Accessibility'],
    datasets: [
      {
        label: 'Total',
        data: [totalScore - accessibilityScore, accessibilityScore],
        backgroundColor: ['#004948', '#0be982'],
        borderWidth: 0,
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
    <div id='dough'>
      <h1>Accessibility</h1>
      <Doughnut data={data} options={options}></Doughnut>
    </div>
  );
};

export default AccessDough;
