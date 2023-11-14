export interface Root {
  page_info: PageInfo;
  page_structure: PageStructure;
  links: Link[];
  images: Image[];
  heading_structure: HeadingStructure;
  form_fields: FormFields;
}

export interface PageInfo {
  title: string;
  language: string;
}

export interface PageStructure {
  header: boolean;
  footer: boolean;
  nav: boolean;
  main: boolean;
}

export interface Link {
  href: string;
  text: string;
}

export interface Image {
  src: string;
  alt: string;
}

export interface HeadingStructure {
  article: Article;
  aside: Aside;
  div: Div;
  footer: Footer;
  form: Form;
  header: Header;
  li: Li;
  main: Main;
  nav: Nav;
  ol: Ol;
  p: P;
  pre: Pre;
  section: Section;
  table: Table;
  ul: Ul;
}

export interface Article {}

export interface Aside {}

export interface Div {
  div_1: any[];
  div_2: any[];
  div_3: any[];
  div_4: any[];
  div_5: any[];
  div_6: any[];
  div_7: any[];
  div_8: any[];
  div_9: any[];
  div_10: any[];
  div_11: any[];
  div_12: any[];
  div_13: any[];
  div_14: any[];
}

export interface Footer {}

export interface Form {
  form_1: any[];
}

export interface Header {}

export interface Li {}

export interface Main {}

export interface Nav {}

export interface Ol {}

export interface P {
  p_1: any[];
}

export interface Pre {}

export interface Section {}

export interface Table {
  table_1: any[];
}

export interface Ul {}

export interface FormFields {
  ie: string;
  hl: string;
  source: string;
  biw: string;
  bih: string;
  q: string;
  btnG: string;
  btnI: string;
  iflsig: string;
  gbv: string;
}
