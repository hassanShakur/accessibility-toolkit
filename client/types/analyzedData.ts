export interface PageInfo {
  score: number;
  total: number;
  itemsCount: number;
  titleCount: number;
  descriptionCount: number;
  viewportCount: number;
  languageCount: number;
}

export interface PageStruct {
  score: number;
  total: number;
  itemsCount: number;
  headerCount: number;
  footerCount: number;
  navCount: number;
  mainCount: number;
}

export interface FormField {
  score: number;
  total: number;
  fieldsCount: number;
  itemsCount: number;
  missingLabel: number;
  missingName: number;
  missingType: number;
}

export interface HeadingStruct {
  score: number;
  total: number;
  itemsCount: number;
}

export interface ImageStruct {
  score: number;
  total: number;
  itemsCount: number;
  missingSrc: number;
  missingAlt: number;
}

export interface LinkStruct {
  score: number;
  total: number;
  itemsCount: number;
  missingHref: number;
  hashHref: number;
}

export interface SiteDetails {
  title: string;
  description: string;
}

export interface AnalyzedData {
  total: number;
  score: number;
  itemsCount: number;
  pageInfo: PageInfo;
  pageStruct: PageStruct;
  formField: FormField;
  headingStruct: HeadingStruct;
  imageStruct: ImageStruct;
  linkStruct: LinkStruct;
}

export const emptyAnalyzedData = {
  total: 0,
  score: 0,
  itemsCount: 0,
  siteDetails: {
    title: '',
    description: '',
  },
  pageInfo: {
    score: 0,
    total: 0,
    titleCount: 0,
    descriptionCount: 0,
    viewportCount: 0,
    languageCount: 0,
  },
  pageStruct: {
    score: 0,
    total: 0,
    headerCount: 0,
    footerCount: 0,
    navCount: 0,
    mainCount: 0,
  },
  formField: {
    score: 0,
    total: 0,
    fieldsCount: 0,
  },
  headingStruct: {
    score: 0,
    total: 0,
  },
  imageStruct: {
    score: 0,
    total: 0,
  },
  linkStruct: {
    score: 0,
    total: 0,
  },
};

export default AnalyzedData;
