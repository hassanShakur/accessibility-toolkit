import AnalyzedDataType from '@/types/analyzedData';
import AccessDough from './AccessDough';
import ElementsCount from './ElementsCount';
import './generalChart.scss';

interface propsType {
  siteData: AnalyzedDataType;
}

const sampleData = {
  total: 52,
  score: 64.72222222222221,
  pageInfo: {
    score: 50,
    total: 2,
    titleCount: 1,
    descriptionCount: 0,
    viewportCount: 0,
    languageCount: 1,
    itemsCount: 2,
  },
  pageStruct: {
    score: 0,
    total: 0,
    headerCount: 0,
    footerCount: 0,
    navCount: 0,
    mainCount: 0,
    itemsCount: 4,
  },
  formField: {
    score: 63.33333333333333,
    total: 30,
    fieldsCount: 10,
    itemsCount: 10,
  },
  headingStruct: {
    score: 100,
    total: 0,
    emptyBlocks: 17,
    wrongOrder: 0,
    itemsCount: 17,
  },
  imageStruct: {
    score: 75,
    total: 4,
    itemsCount: 2,
  },
  linkStruct: {
    score: 100,
    total: 16,
    itemsCount: 16,
  },
  itemsCount: 61,
};

const GeneralChart = (props: propsType) => {
  // console.log(props.siteData);
  const data = props.siteData;

  return (
    <div id='summary'>
      <AccessDough accessibilityScore={data.score} />
      <ElementsCount data={data} />
    </div>
  );
};

export default GeneralChart;
