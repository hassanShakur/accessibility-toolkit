import { LinkStruct } from '@/types/analyzedData';
import linkImg from '@/public/images/http.png';
import removeImg from '@/public/images/remove.png';
import checkImg from '@/public/images/verification.png';
import Image from 'next/image';
import './linkStruct.scss';

import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ColoredScore from '../ColoredScore';

Chart.register(ArcElement, Legend, Tooltip);

interface PropType {
  data: LinkStruct;
}

const LinkStruct = (props: PropType) => {
  const linkData = props.data;
  const infoItems = {
    missingHref: 'Href tags present',
    hashHref: 'Hrefs pointing to #',
  };

  const data = {
    labels: ['Score', 'Missing'],
    datasets: [
      {
        label: 'Link Structure',
        data: [linkData.score, 100 - linkData.score],
        backgroundColor: ['#2ec9ff', '#464a50'],
      },
    ],
  };

  return (
    <div id='link-struct' className='card'>
      <div className='card-header'>
        <Image src={linkImg} alt='link icon' />
        <h2>Link Structure</h2>
        <ColoredScore score={linkData.score} />
      </div>

      <div className='card-body'>
        <div className='card-pointers'>
          <p>
            Link structure is the basic structure of the page. The
            score is calculated based on the presence of the following
            items.
          </p>
          <ul>
            {Object.entries(linkData).map(([key, value]) => {
              return key in infoItems ? (
                <li key={key}>
                  {value === 0 ? (
                    <Image src={checkImg} alt='Check icon' />
                  ) : (
                    <Image src={removeImg} alt='Remove icon' />
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

export default LinkStruct;
