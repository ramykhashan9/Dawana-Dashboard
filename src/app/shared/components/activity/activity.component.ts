import { Component, 
  //EventEmitter,
   Input, 
  OnDestroy, OnInit,
//  Output 
  } from '@angular/core';
//import { ActivitiesService } from '../../services/activities.service';
//import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnDestroy {
 // constructor(private activitiesServices: ActivitiesService) { }
  ngOnInit(): void {
   // this._getActiviies();
  }

  // @Output() onToggleSideNav: EventEmitter<boolean> = new EventEmitter();
   @Input() collapsed: boolean = true;
  // subscribe: Subscription = new Subscription();
  // activitiesData: { title: string, createdAt: string }[] = [

  // ]
   dir: string = "rtl";
  // strech() {
  //   this.collapsed = !this.collapsed;

  //   this.onToggleSideNav.emit(this.collapsed,
  //   );
  // }
  // close() {
  //   this.collapsed = false;
  //   this.onToggleSideNav.emit(this.collapsed,
  //   );
  // }
  // _getActiviies() {
  //   let activitiesSubscription = this.activitiesServices.getActivities(0, 10).subscribe(
  //     (response) => {
  //       this.activitiesData = response["data"];

  //     }, error => {
  //       console.log(error);
  //     }
  //   );
  //   this.subscribe.add(activitiesSubscription);

  // }
  ngOnDestroy() {
   // this.subscribe.unsubscribe();
  }
}
