import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { routes } from './navigation-routes.config';

import { NavbarDataModal } from './side-menu_helper';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '../../config';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  navbarData: NavbarDataModal[];
  logoutLable: string;
  adminRole: string;
  subscriptions: Subscription = new Subscription();
  userDepartmentId: string;
  multiple: boolean = false;

  ngOnInit() {
    this.setSideMenuTabs();
    this.translateLabels();
  }
  constructor(public translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
  ) { }
  @Output() onToggleSideNav: EventEmitter<boolean> = new EventEmitter();
  @Input() collapsed: boolean = true;

  setSideMenuTabs() {
    this.adminRole = this.storage.getRole().replace(/"/g, '');
    this.navbarData = routes.filter(e => e.roles.includes(this.adminRole));

  }
  translateLabels() {
    let subscription2$;
    let subscription3$;
    let subscription$ = this.translate.get('LOGOUT').subscribe(
      (res) => {
        this.logoutLable = res;
      }
    );
    for (let item of this.navbarData) {
      subscription2$ = this.translate.get(item.lable).subscribe(
        (res) => {
          item.lable = res;
        }
      );
      if (item.subItem) {
        for (let i of item.subItem) {
          subscription3$ = this.translate.get(i.lable).subscribe(
            (res) => {
              i.lable = res;
            }
          );
        }
      }
    }

    this.subscriptions.add(subscription$);
    this.subscriptions.add(subscription2$);
    this.subscriptions.add(subscription3$);
  }
  strech() {
    this.collapsed = !this.collapsed;

    this.onToggleSideNav.emit(
      this.collapsed
    );
  }
  close() {
    this.collapsed = false;
    this.onToggleSideNav.emit(this.collapsed,
    );
  }
  selectedTab: number = -1;

  handleClick(item: NavbarDataModal, index: number) {
    if (!this.multiple) {
      for (let modelItem of this.navbarData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
    this.selectedTab = index;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/dawana/auth/login']);
  }
  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }


}