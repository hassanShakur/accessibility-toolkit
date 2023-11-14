import Report from '@/types/report';
import {
  PageStructure,
  PageInfo,
  FormField,
  HeadingStructure,
  ImageStructure,
  LinkStructure,
} from '@/types/report';

const analyzer = (report: Report) => {
  const {
    page_info,
    page_structure,
    form_fields,
    heading_structure,
    images,
    links,
  } = report;
  const pageInfo = pageInfoAnalyzer(page_info);
  const pageStruct = pageStructAnalyzer(page_structure);
  const formField = formFieldAnalyzer(form_fields);
  const headingStruct = headingStructAnalyzer(heading_structure);
  const imageStruct = imageStructAnalyzer(images);
  const linkStruct = linkStructAnalyzer(links);

  const total =
    pageInfo.total +
    pageStruct.total +
    formField.total +
    headingStruct.total +
    imageStruct.total +
    linkStruct.total;
  const score =
    (pageInfo.score +
      pageStruct.score +
      formField.score +
      headingStruct.score +
      imageStruct.score +
      linkStruct.score) /
    6;

  return {
    total,
    score,
    pageInfo,
    pageStruct,
    formField,
    headingStruct,
    imageStruct,
    linkStruct,
  };
};

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

const imageStructAnalyzer = (imageStruct: ImageStructure[]) => {
  const total = imageStruct.length * 2;
  let score = 0;

  imageStruct.forEach((image) => {
    if (image.src) score += 1;
    if (image.alt) score += 1;
  });

  score = (score / total) * 100;

  return {
    score,
    total,
  };
};

const linkStructAnalyzer = (linkStruct: LinkStructure[]) => {
  const total = linkStruct.length * 2;
  let score = 0;

  linkStruct.forEach((link) => {
    if (link.href) score += 1;
    if (link.text) score += 1;
  });

  score = (score / total) * 100;

  return {
    score,
    total,
  };
};

export default analyzer;
