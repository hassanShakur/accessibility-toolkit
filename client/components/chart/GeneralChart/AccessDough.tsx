import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { calcScoreColor } from '../ColoredScore';

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
        backgroundColor: [
          '#464a5050',
          calcScoreColor(accessibilityScore),
        ],
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

  const textCenterPlugin = {
    id: 'textCenter',
    beforeDraw: (chart: any) => {
      const { ctx, data } = chart;
      const { width, height } = chart;
      const formattedAccessibilityScore = Math.ceil(
        accessibilityScore
      );


      ctx.save();
      ctx.font = 'bold 1.5rem sans-serif';
      ctx.fillStyle = calcScoreColor(accessibilityScore);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        `${formattedAccessibilityScore}%`,
        width / 2,
        height / 2
      );
      // const width = chart.chart.width,
      //   height = chart.chart.height,

      // ctx.restore();

      // const text = accessibilityScore + '%',
      //   textX = Math.round((width - ctx.measureText(text).width) / 2),
      //   textY = height / 2;

      // ctx.fillText(text, textX, textY);
      // ctx.save();
    },
  };

  return (
    <div id='dough'>
      <h1>Accessibility</h1>
      <Doughnut
        data={data}
        options={options}
        plugins={[textCenterPlugin]}
      ></Doughnut>
    </div>
  );
};

export default AccessDough;
