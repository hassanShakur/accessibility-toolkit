import Image from 'next/image';

import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { FormFieldType } from '@/types/analyzedData';
import formImg from '@/public/images/form.png';
import removeImg from '@/public/images/remove.png';
import checkImg from '@/public/images/verification.png';

import ColoredScore from '../ColoredScore';

Chart.register(ArcElement, Legend, Tooltip);

interface PropType {
  data: FormFieldType;
}

const FormField = (props: PropType) => {
  const pageData = props.data;
  const infoItems = {
    missingLabel: 'Input label',
    missingName: 'Input name',
    missingType: 'Input type',
  };

  const data = {
    labels: ['Score', 'Missing'],
    datasets: [
      {
        label: 'Form Field',
        data: [pageData.score, 100 - pageData.score],
        backgroundColor: ['#dd0b78', '#464a50'],
      },
    ],
  };

  return (
    <div id='form-field' className='card'>
      <div className='card-header'>
        <Image src={formImg} alt='form icon' />
        <h2>Form Fields</h2>
        <ColoredScore score={pageData.score} />
      </div>

      <div className='card-body'>
        <div className='card-pointers'>
          <p>
            Form field is the basic structure of the page. The score
            is calculated based on the presence of the following
            items.
          </p>
          <ul>
            {Object.entries(pageData).map(([key, value]) => {
              return key in infoItems ? (
                <li key={key}>
                  {value === 1 ? (
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
          <Pie data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default FormField;
