import { PageInfo } from '@/types/analyzedData';
import infoImg from '@/public/images/info.png';
import removeImg from '@/public/images/remove.png';
import checkImg from '@/public/images/verification.png';
import Image from 'next/image';
import './pageInfo.scss';

import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ColoredScore from '../ColoredScore';

Chart.register(ArcElement, Legend, Tooltip);

interface PropType {
  data: PageInfo;
}

const PageInfo = (props: PropType) => {
  const pageData = props.data;
  const infoItems = {
    titleCount: 'Page title',
    descriptionCount: 'Description',
    viewportCount: 'View port',
    languageCount: 'Language',
  };

  const data = {
    labels: ['Score', 'Missing'],
    datasets: [
      {
        label: 'Page Information',
        data: [pageData.score, 100 - pageData.score],
        backgroundColor: ['#2ec9ff', '#464a50'],
      },
    ],
  };

  return (
    <div id='page-info' className='card'>
      <div className='card-header'>
        <Image src={infoImg} alt='info' />
        <h2>Page Information</h2>
        <ColoredScore score={pageData.score} />
      </div>

      <div className='card-body'>
        <div className='card-pointers'>
          <p>
            Page information is the basic information about the page
            that is displayed in the browser tab and for
            accessibility. The score is calculated based on the
            presence of the following items.
          </p>
          <ul>
            {Object.entries(pageData).map(([key, value]) => {
              return key in infoItems ? (
                <li key={key}>
                  {value === 0 ? (
                    <Image src={removeImg} alt='Remove icon' />
                  ) : (
                    <Image src={checkImg} alt='verification icon' />
                  )}
                  <p>{infoItems[key]}</p>
                </li>
              ) : (
                ''
              );
            })}
          </ul>
        </div>

        <Pie data={data} />
      </div>
    </div>
  );
};

export default PageInfo;
