import { Component, Input, OnInit } from '@angular/core';
import { NavbarDataModal } from './side-menu_helper';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

@Component({
    selector: 'app-sublevel-menu',
    template: `
    <ul
      class="sublevel-nav"
      *ngIf="
        expanded && data!.subItem && data!.subItem!.length > 0
      "
    >
      <li class="sublevel-nav-item" *ngFor="let item of data!.subItem">
        <a
          (click)="handleClick(item)"
          class="sublevel-nav-link"
          *ngIf="item.subItem && item.subItem.length > 0"
        >
            <i class="sublevel-link-icon"[ngClass]="[item.icon]"></i>
          <span class="sublevel-link-text" 
            >{{ item.lable }} </span
          >
          <i
            class="menu-collapse-icon"
            *ngIf="item.subItem "
            [ngClass]="
              !item.expanded ? 'pi pi-angle-right' : 'pi pi-angle-down'
            "
          ></i>
        </a>
        <a
          class="sublevel-nav-link"
          *ngIf="!item.subItem || (item.subItem && item.subItem.length === 0)"
          [routerLink]="[item.routerLink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <i class="sublevel-link-icon"[ngClass]="[item.icon]"></i>
          <span class="sublevel-link-text"  
            >{{ item.lable }} </span
          >
        </a>
        <div *ngIf="item.subItem && item.subItem.length > 0">
          <app-sublevel-menu
            [data]="item" 
            [expanded]="item.expanded"
            [multiple]="multiple"
          ></app-sublevel-menu>
        </div>
      </li>
    </ul>
  `,
    styleUrls: ['./side-menu.component.scss'],
    animations: [
        trigger('submenu', [
            state('hidden', style({ height: '0', overflow: 'hidden' })),
            state('expanded', style({ height: '*' })),
            transition('visible <=> hidden', [
                style({ overflow: 'hidden' }),
                animate('{{transitionParams}'),
            ]),
            transition('void => *', animate(0)),
        ]),
    ],
})
export class SublevelMenuComponent implements OnInit {
    @Input() data?: NavbarDataModal = {
        routerLink: '',
        lable: '',
        icon: '',
        subItem: [],
    };

    @Input() animating: boolean | undefined;
    @Input() expanded: boolean | undefined;
    @Input() multiple: boolean = false;
    constructor() { }
    ngOnInit(): void { }
    handleClick(item: any): void {
        if (!this.multiple) {
            if (this.data?.subItem && this.data.subItem.length > 0) {
                for (let itemModel of this.data.subItem) {
                    if (item !== itemModel && itemModel.expanded) {
                        itemModel.expanded = true;
                    }
                }
            }
        }
        item.expanded = !item.expanded;
    }
}
//       [@submenu]="
//   expanded
//     ? {
//         value: 'visible',
//         params: { transitionParams: '400ms cubic-bezier(0.86 ,0, 0.07, 1)',height:'*' }
//       }
//     : {
//       value: 'hidden',
//         params: { transitionParams: '400ms cubic-bezier(0.86 ,0, 0.07, 1)',height:'0' }
//     }
// "
