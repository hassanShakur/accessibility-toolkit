import { PageInfo } from '@/types/analyzedData';
import infoImg from '@/public/images/info.png';
import removeImg from '@/public/images/remove.png';
import checkImg from '@/public/images/verification.png';
import Image from 'next/image';
import './pageInfo.scss'

interface PropType {
  data: PageInfo;
}

const PageInfo = (props: PropType) => {
  const { data } = props;
  const infoItems = {
    titleCount: 'Page title',
    descriptionCount: 'Description',
    viewportCount: 'View port',
    languageCount: 'Language',
  };
  return (
    <div id='page-info' className='card'>
      <div className='card-header'>
        <h3>Page Information</h3>
        <p>Pie %</p>
      </div>

      <div id='card-content'>
        <div id='card-image'>
          <Image src={infoImg} alt='info' />
        </div>

        <div id='card-info'>
          <h4>Pointers</h4>
          <ul className='card-pointer'>
            {Object.entries(data).map(([key, value]) => {
              return key in infoItems ? (
                <li key={key}>
                  <span className='pointer-icon'>
                    {value ? (
                      <Image src={checkImg} alt='verification icon' />
                    ) : (
                      <Image src={removeImg} alt='Remove icon' />
                    )}
                  </span>
                  <span className='pointer-item'>
                    {infoItems[key]}
                  </span>
                </li>
              ) : (
                ''
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageInfo;
