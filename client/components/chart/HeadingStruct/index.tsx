import { HeadingStruct } from '@/types/analyzedData';
import headStructImg from '@/public/images/hierarchical-structure.png';
import removeImg from '@/public/images/remove.png';
import checkImg from '@/public/images/verification.png';
import Image from 'next/image';
import './headingStruct.scss';

import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ColoredScore from '../ColoredScore';

Chart.register(ArcElement, Legend, Tooltip);

interface PropType {
  data: HeadingStruct;
}

const HeadingStruct = (props: PropType) => {
  const headingData = props.data;
  const infoItems = {
    emptyBlocks: 'Empty Blocks',
    wrongOrder: 'Wrong Order',
  };

  const data = {
    labels: ['Score', 'Missing'],
    datasets: [
      {
        label: 'Heading Structure',
        data: [headingData.score, 100 - headingData.score],
        backgroundColor: ['#dd0b78', '#464a50'],
      },
    ],
  };

  return (
    <div id='heading-struct' className='card'>
      <div className='card-header'>
        <Image src={headStructImg} alt='page struc algorithm icon' />
        <h2>Heading Structure</h2>
        <ColoredScore score={headingData.score} />
      </div>

      <div className='card-body'>
        <div className='card-pointers'>
          <p>
            Heading structure is the basic structure of the page. The
            score is calculated based on the presence of the following
            items.
          </p>
          <ul>
            {Object.entries(headingData).map(([key, value]) => {
              return key in infoItems ? (
                <li key={key}>
                  {value === 0 ? (
                    <Image src={removeImg} alt='Remove icon' />
                  ) : (
                    <Image src={checkImg} alt='Check icon' />
                  )}
                  <span>{infoItems[key]}</span>
                </li>
              ) : null;
            })}
          </ul>
        </div>
        <div className='card-chart'>
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default HeadingStruct;
