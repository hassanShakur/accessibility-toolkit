import { PageStruct } from '@/types/analyzedData';
import algoImg from '@/public/images/algorithm.png';
import removeImg from '@/public/images/remove.png';
import checkImg from '@/public/images/verification.png';
import Image from 'next/image';

import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ColoredScore from '../ColoredScore';

Chart.register(ArcElement, Legend, Tooltip);

interface PropType {
  data: PageStruct;
}

const PageStruct = (props: PropType) => {
  const pageData = props.data;
  const infoItems = {
    headerCount: 'Header',
    footerCount: 'Footer',
    navCount: 'Navigation',
    mainCount: 'Main',
  };

  const data = {
    labels: ['Score', 'Missing'],
    datasets: [
      {
        label: 'Page Structure',
        data: [pageData.score, 100 - pageData.score],
        backgroundColor: ['#dd0b78', '#464a50'],
      },
    ],
  };

  return (
    <div id='page-struct' className='card'>
      <div className='card-header'>
        <Image src={algoImg} alt='page struc algorithm icon' />
        <h2>Page Structure</h2>
        <ColoredScore score={pageData.score} />
      </div>

      <div className='card-body'>
        <div className='card-pointers'>
          <p>
            Page structure is the basic structure of the page. The
            score is calculated based on the presence of the following
            items.
          </p>
          <ul>
            {Object.entries(pageData).map(([key, value]) => {
              return key in infoItems ? (
                <li key={key}>
                  {value === 0 ? (
                    <Image src={removeImg} alt='Remove icon' />
                  ) : (
                    <Image src={checkImg} alt='Check icon' />
                  )}
                  <span>
                    {infoItems[key as keyof typeof infoItems]}
                  </span>
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

export default PageStruct;
