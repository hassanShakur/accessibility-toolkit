import Image from 'next/image';

import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { ImageStructType } from '@/types/analyzedData';
import imgStructImg from '@/public/images/image.png';
import removeImg from '@/public/images/remove.png';
import checkImg from '@/public/images/verification.png';
import ColoredScore from '../ColoredScore';

Chart.register(ArcElement, Legend, Tooltip);

interface PropType {
  data: ImageStructType;
}

const ImageStruct = (props: PropType) => {
  const imgData = props.data;
  const infoItems = {
    missingAlt: 'Alt tags present',
    missingSrc: 'Src tags present',
  };

  const data = {
    labels: ['Score', 'Missing'],
    datasets: [
      {
        label: 'Image Structure',
        data: [imgData.score, 100 - imgData.score],
        backgroundColor: ['#ed6560', '#464a50'],
      },
    ],
  };

  return (
    <div id='image-struct' className='card'>
      <div className='card-header'>
        <Image src={imgStructImg} alt='image icon' />
        <h2>Image Structure</h2>
        <ColoredScore score={imgData.score} />
      </div>

      <div className='card-body'>
        <div className='card-pointers'>
          <p>
            Image structure is the basic structure of the page. The
            score is calculated based on the presence of the following
            items.
          </p>
          <ul>
            {Object.entries(imgData).map(([key, value]) => {
              return key in infoItems ? (
                <li key={key}>
                  {value === 0 ? (
                    <Image src={checkImg} alt='Check icon' />
                  ) : (
                    <Image src={removeImg} alt='Remove icon' />
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

export default ImageStruct;
