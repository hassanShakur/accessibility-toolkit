import Report from '@/types/report';
import {
  PageStructure,
  PageInfo,
  FormField,
  HeadingStructure,
  ImageStructure,
  LinkStructure,
} from '@/types/report';

// const roundNum = (num: number) =>
//   Math.round((num + Number.EPSILON) * 100) / 100;
const roundNum = (num: number) => Math.ceil(num);

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

  const itemsCount =
    pageInfo.itemsCount +
    pageStruct.itemsCount +
    formField.itemsCount +
    formField.itemsCount +
    headingStruct.itemsCount +
    imageStruct.itemsCount +
    linkStruct.itemsCount;

  return {
    total,
    score: roundNum(score),
    pageInfo,
    pageStruct,
    formField,
    headingStruct,
    imageStruct,
    linkStruct,
    itemsCount,
  };
};

const pageStructAnalyzer = (pageStructure: PageStructure) => {
  const { header, footer, nav, main } = pageStructure;
  const itemsCount = Object.keys(pageStructure).length;
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
    itemsCount,
  };
};

const pageInfoAnalyzer = (pageInfo: PageInfo) => {
  const { title, description, viewport, language } = pageInfo;
  const itemsCount = Object.keys(pageInfo).length;
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
    itemsCount,
  };
};

const formFieldAnalyzer = (formFields: FormField[]) => {
  const fieldsCount = formFields.length;
  let itemsCount = fieldsCount * 3;
  let missingLabel = 0;
  let missingName = 0;
  let missingType = 0;

  if (fieldsCount === 0)
    return {
      score: 100,
      total: 0,
      fieldsCount,
      itemsCount,
      missingLabel,
      missingName,
      missingType,
    };

  const total = fieldsCount * 3;

  let score = 0;
  formFields.forEach((field) => {
    field.label ? (score += 1) : (missingLabel = 1);
    field.name ? (score += 1) : (missingName = 1);
    field.type ? (score += 1) : (missingType = 1);
  });
  score = (score / total) * 100;
  return {
    score: roundNum(score),
    total,
    fieldsCount,
    itemsCount,
    missingLabel,
    missingName,
    missingType,
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

  const itemsCount = total;
  total -= emptyBlocks;
  if (total === 0)
    return {
      score: 100,
      total: 0,
      emptyBlocks,
      wrongOrder,
      itemsCount,
    };

  const score = ((total - wrongOrder) / total) * 100;
  return {
    score: roundNum(score),
    total,
    emptyBlocks,
    wrongOrder,
    itemsCount,
  };
};

const imageStructAnalyzer = (imageStruct: ImageStructure[]) => {
  const total = imageStruct.length * 2;
  const itemsCount = imageStruct.length;
  let missingSrc = 0;
  let missingAlt = 0;
  if (total === 0)
    return {
      score: 100,
      total: 0,
      itemsCount,
      missingSrc,
      missingAlt,
    };

  let score = 0;

  imageStruct.forEach((image) => {
    image.src ? (score += 1) : (missingSrc += 1);
    image.alt ? (score += 1) : (missingAlt += 1);
  });

  score = (score / total) * 100;

  return {
    score: roundNum(score),
    total,
    itemsCount,
    missingSrc,
    missingAlt,
  };
};

const linkStructAnalyzer = (linkStruct: LinkStructure[]) => {
  const total = linkStruct.length;
  let missingHref = 0;
  let hashHref = 0;
  if (total === 0) return { score: 100, total: 0, itemsCount: 0, missingHref, hashHref };

  let score = 0;

  linkStruct.forEach((link) => {
    switch (link.href) {
      case '':
        missingHref += 1;
        break;
      case '#':
        hashHref += 1;
        break;
      default:
        score += 1;
    }
  });

  score = (score / total) * 100;

  return {
    score: roundNum(score),
    total,
    itemsCount: total,
    missingHref,
    hashHref,
  };
};

export default analyzer;
