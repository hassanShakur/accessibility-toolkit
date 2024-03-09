export interface ReportType {
  pageInfo: PageInfoType;
  pageStructure: PageStructureType;
  links: LinkStructureType[];
  images: ImageStructureType[];
  headingStructure: HeadingStructureType;
  formFields: FormFieldType[];
}

export interface PageInfoType {
  title: string;
  description: string;
  viewport: string;
  language: string;
}

export interface PageStructureType {
  header: boolean;
  footer: boolean;
  nav: boolean;
  main: boolean;
}

export interface LinkStructureType {
  href: string;
  text: string;
}

export interface ImageStructureType {
  src: string;
  alt: string;
}

export interface HeadingStructureType {
  article: number[];
  aside: number[][];
  div: number[][];
  footer: number[][];
  form: number[][];
  header: number[][];
  li: number[][];
  main: number[];
  nav: number[][];
  ol: number[];
  p: number[][];
  pre: number[];
  section: number[];
  table: number[];
  ul: number[][];
}

export interface FormFieldType {
  name: string;
  label: string;
  type: string;
}

export const emptyReport = {
  pageInfo: {
    title: '',
    description: '',
    viewport: '',
    language: '',
  },
  pageStructure: {
    header: false,
    footer: false,
    nav: false,
    main: false,
  },
  links: [],
  images: [],
  headingStructure: {
    article: [],
    aside: [],
    div: [],
    footer: [],
    form: [],
    header: [],
    li: [],
    main: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    section: [],
    table: [],
    ul: [],
  },
  formFields: [],
};

export default ReportType;
