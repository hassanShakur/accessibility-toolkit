import { SiteDetails } from '@/types/analyzedData';
import './siteDetails.scss';

interface PropType {
  data: SiteDetails | undefined;
  url: string;
}

const SiteDetails = (props: PropType) => {
  if (!props.data) return null;

  const { description, title } = props.data;
  const url = props.url;

  console.log(props.url);

  return (
    <div id='site-details'>
      <h2>Site Details</h2>
      <div>
        <label>URL</label>
        <p>{url || 'Null'}</p>
      </div>
      <div>
        <label>Title</label>
        <p>{title || 'Null'}</p>
      </div>
      <div>
        <label>Description</label>
        <p>{description || 'Null'}</p>
      </div>
    </div>
  );
};

export default SiteDetails;
