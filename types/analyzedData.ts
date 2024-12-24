export interface PageInfoType {
  score: number;
  total: number;
  itemsCount: number;
  titleCount: number;
  descriptionCount: number;
  viewportCount: number;
  languageCount: number;
}

export interface PageStructType {
  score: number;
  total: number;
  itemsCount: number;
  headerCount: number;
  footerCount: number;
  navCount: number;
  mainCount: number;
}

export interface FormFieldType {
  score: number;
  total: number;
  fieldsCount: number;
  itemsCount: number;
  missingLabel: number;
  missingName: number;
  missingType: number;
}

export interface HeadingStructType {
  score: number;
  total: number;
  itemsCount: number;
  emptyBlocks: number;
  wrongOrder: number;
}

export interface ImageStructType {
  score: number;
  total: number;
  itemsCount: number;
  missingSrc: number;
  missingAlt: number;
}

export interface LinkStructType {
  score: number;
  total: number;
  itemsCount: number;
  missingHref: number;
  hashHref: number;
}

export interface SiteDetailsType {
  title: string;
  description: string;
}

export interface AnalyzedDataType {
  total: number;
  score: number;
  itemsCount: number;
  pageInfo: PageInfoType;
  pageStruct: PageStructType;
  formField: FormFieldType;
  headingStruct: HeadingStructType;
  imageStruct: ImageStructType;
  linkStruct: LinkStructType;
}

export const emptyAnalyzedDataType = {
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

export default AnalyzedDataType;
