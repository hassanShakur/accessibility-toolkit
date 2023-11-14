import Report from '@/types/report';
import {
  PageStructure,
  PageInfo,
  FormField,
  HeadingStructure,
  ImageStruct,
  LinkStruct,
} from '@/types/report';

const analyzer = (report: Report) => {};

const pageStructAnalyzer = (pageStructure: PageStructure) => {
  const { header, footer, nav, main } = pageStructure;
  const headerCount = header ? 1 : 0;
  const footerCount = footer ? 1 : 0;
  const navCount = nav ? 1 : 0;
  const mainCount = main ? 1 : 0;
  const total = headerCount + footerCount + navCount + mainCount;
  const score = total === 4 ? 100 : total * 25;
  return {
    score,
    total,
    headerCount,
    footerCount,
    navCount,
    mainCount,
  };
};

const pageInfoAnalyzer = (pageInfo: PageInfo) => {
  const { title, description, viewport, language } = pageInfo;
  const titleCount = title ? 1 : 0;
  const descriptionCount = description ? 1 : 0;
  const viewportCount = viewport ? 1 : 0;
  const languageCount = language ? 1 : 0;
  const total =
    titleCount + descriptionCount + viewportCount + languageCount;
  const score = total === 4 ? 100 : total * 25;
  return {
    score,
    total,
    titleCount,
    descriptionCount,
    viewportCount,
    languageCount,
  };
};

const formFieldAnalyzer = (formFields: FormField[]) => {
  const fieldsCount = formFields.length;
  const total = fieldsCount * 3;
  let score = 0;
  formFields.forEach((field) => {
    if (field.label) score += 1;
    if (field.name) score += 1;
    if (field.type) score += 1;
  });
  score = (score / total) * 100;
  return {
    score,
    total,
    fieldsCount,
  };
};

export default analyzer;
