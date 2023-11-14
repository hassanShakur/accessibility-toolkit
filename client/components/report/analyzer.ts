import Report from '@/types/report';
import {
  PageStructure,
  PageInfo,
  FormField,
  HeadingStructure,
  ImageStructure,
  LinkStructure,
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

const headingStructAnalyzer = (headingStruct: HeadingStructure) => {
  let total = 0;
  let emptyBlocks = 0;
  let wrongOrder = 0;

  for (const [key, value] of Object.entries(headingStruct)) {
    if (value.length === 0) continue;

    total += value.length;
    value.map((entry: number[]) => {
      if (entry.length === 0) emptyBlocks += 1;

      let prevNum = entry[0];
      let entryWrongOrder = false;

      entry.map((num: number) => {
        if (num < prevNum) {
          entryWrongOrder = true;
          return;
        }
        prevNum = num;
      });

      if (entryWrongOrder) wrongOrder += 1;
    });
  }

  const score = ((total - emptyBlocks - wrongOrder) / total) * 100;
  return {
    score,
    total,
    emptyBlocks,
    wrongOrder,
  };
};

export default analyzer;
