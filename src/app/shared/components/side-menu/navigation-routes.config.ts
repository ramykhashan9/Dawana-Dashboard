import { NavbarDataModal } from './side-menu_helper';

//Sidebar menu Routes and data
export const routes: NavbarDataModal[] = [
  { routerLink: '/dawana/pages/pharmacies', icon: 'pi pi-home', lable: 'PHARMACIES', },
  { routerLink: '/dawana/pages/inspectors', icon: 'pi pi-users', lable: 'INSPECTORS', },
  { routerLink: '/dawana/pages/admins', icon: 'pi pi-users', lable: 'ADMINS', },
  {
    routerLink: '/dawana/pages/settings', icon: 'pi pi-cog', lable: 'SETTINGS', subItem: [
      { routerLink: '/dawana/pages/mobile-versions', icon: 'pi pi-mobile', lable: 'MOBILEVERSIONS', },
    ]
  },
  // { routerLink: '/dawana/pages/users', icon: 'pi pi-users', lable: 'USERS' ,roles:['SuperAdmin']},
  // { routerLink: '/dawana/pages/tickets', icon: 'pi pi-ticket', lable: 'TICKETS' ,roles:['admin','user','SuperAdmin']},
  // { routerLink: '/dawana/pages/direct-tickets', icon: 'pi pi-ticket', lable: 'DIRECTTICKETS' ,roles:['admin','user','SuperAdmin']},
  // { routerLink: '/dawana/pages/not-direct-tickets', icon: 'pi pi-ticket', lable: 'NOTDIRECTTICKETS' ,roles:['admin','user','SuperAdmin']},
  // { routerLink: '/dawana/pages/inprogress-tickets', icon: 'pi pi-ticket', lable: 'INPROGRESSTICKETS' ,roles:['admin','user','SuperAdmin']},
  // { routerLink: '/dawana/pages/submitted-tickets', icon: 'pi pi-ticket', lable: 'SUBMITEDTICKETS' ,roles:['admin','user','SuperAdmin']},
  // { routerLink: '/dawana/pages/data-completed-tickets', icon: 'pi pi-ticket', lable: 'DATAISBEINGCOMPLETEDTICKETS' ,roles:['admin','user','SuperAdmin']},
  // { routerLink: '/dawana/pages/archive-tickets', icon: 'pi pi-ticket', lable: 'ARCHIVETICKETS' ,roles:['admin','user','SuperAdmin']},
  // { routerLink: '/dawana/pages/close-tickets', icon: 'pi pi-ticket', lable: 'CLOSEDTICKETS' ,roles:['admin','user','SuperAdmin']},



];
