export interface NavbarDataModal {
  routerLink: string;
  icon?: string;
  lable: string;
  expanded?: boolean;
  subItem?: NavbarDataModal[];
  roles?: string[];
}
