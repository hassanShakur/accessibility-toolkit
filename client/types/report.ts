export interface Root {
  page_info: PageInfo;
  page_structure: PageStructure;
  links: Link[];
  images: Image[];
  heading_structure: HeadingStructure;
  form_fields: FormField[];
}

export interface PageInfo {
  title: string;
  description: string;
  viewport: string;
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

export interface FormField {
  name: string;
  label: string;
  type: string;
}
