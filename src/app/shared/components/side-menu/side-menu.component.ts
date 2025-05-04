import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { routes } from './navigation-routes.config';

import { NavbarDataModal } from './side-menu_helper';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import { Storage } from '../../config';
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
  
  ngOnInit() {
   
    // this.adminRole = this.storage.getAdminRole();
    // if (this.adminRole === '"user"') {
      this.navbarData = routes ;
      // this.navbarData = routes.filter(e => e.roles.includes('user'));
    // }
 
    this.translateLabels();
  }
  constructor(public translate: TranslateService,
   private authService: AuthService,
   private router: Router,
    // private storage: Storage,
    ) { }
  @Output() onToggleSideNav: EventEmitter<boolean> = new EventEmitter();
  @Input() collapsed: boolean = true;


  translateLabels() {
    let subscription2$;
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
    }
    this.subscriptions.add(subscription$);
    this.subscriptions.add(subscription2$);
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