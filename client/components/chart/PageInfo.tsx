import { PageInfo } from '@/types/analyzedData';
import infoImg from '@/public/images/info.png';
import removeImg from '@/public/images/remove.png';
import checkImg from '@/public/images/verification.png';
import Image from 'next/image';
import './pageInfo.scss';

import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

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
        backgroundColor: ['#3e95cd', '#8e5ea2'],
      },
    ],
  };

  const calcScoreColor = (score: number) => {
    if (score >= 90) {
      return 'green';
    } else if (score >= 50) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <div id='page-info' className='card'>
      <div className='card-header'>
        <Image src={infoImg} alt='info' />
        <h3>Page Information</h3>
        <h1
          style={{
            color: calcScoreColor(pageData.score),
          }}
        >
          {pageData.score}%
        </h1>
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
                    <Image src={checkImg} alt='verification icon' />
                  ) : (
                    <Image src={removeImg} alt='Remove icon' />
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
