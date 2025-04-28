import { computed, inject, Injectable } from '@angular/core';
import { BreakpointObserver} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private readonly small = '(max-width:600px)';
  private readonly meduim = '(min-width:601px) and (max-width:1000px)';
  private readonly large = '(min-width:1001px)';
  responsiveObserrver =inject(BreakpointObserver);

  screenWidth= toSignal(this.responsiveObserrver.observe([this.small, this.meduim, this.large]));

  smallWidth= computed(()=>this.screenWidth()?.breakpoints[this.small]);
  meduimWidth= computed(()=>this.screenWidth()?.breakpoints[this.meduim]);
  largeWidth= computed(()=>this.screenWidth()?.breakpoints[this.large]);

}
