import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AnalyzedData from '@/types/analyzedData';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface propsType {
  data: AnalyzedData;
}

const ElementsCount = (props: propsType) => {
  const siteData = props.data;
  let structElementsCount = {
    'Links': siteData.linkStruct.itemsCount,
    'Images': siteData.imageStruct.itemsCount,
    'Block Elements': siteData.headingStruct.itemsCount,
    'Form Fields': siteData.formField.itemsCount,
    'Page Info': siteData.pageInfo.itemsCount,
    'Page Structure': siteData.pageStruct.itemsCount,
  };

  // sort the object by value

  const data = {
    labels: Object.keys(structElementsCount),
    datasets: [
      {
        label: 'Elements Count',
        data: Object.values(structElementsCount),
        backgroundColor: '#ffaa01',
        borderColor: '#ffaa01',
      },
    ],
  };

  const options = {
    plugins: {
      indexAxis: 'x',
      legend: {
        display: false,
      },
    },
  };

  return (
    <div id='bar-count'>
      <h1>Elements Count</h1>
      <Bar data={data} options={options}></Bar>
    </div>
  );
};

export default ElementsCount;
