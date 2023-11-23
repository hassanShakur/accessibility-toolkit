interface PageInfo {
  score: number;
  total: number;
  titleCount: number;
  descriptionCount: number;
  viewportCount: number;
  languageCount: number;
}

interface PageStruct {
  score: number;
  total: number;
  headerCount: number;
  footerCount: number;
  navCount: number;
  mainCount: number;
}

interface FormField {
  score: number;
  total: number;
  fieldsCount: number;
}

interface HeadingStruct {
  score: number;
  total: number;
}

interface ImageStruct {
  score: number;
  total: number;
}

interface LinkStruct {
  score: number;
  total: number;
}

interface AnalyzedData {
  total: number;
  score: number;
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
