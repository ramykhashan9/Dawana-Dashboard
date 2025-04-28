import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dawana-dashboard';
  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.translateService.setDefaultLang('ar');
    this.translateService.use("ar");

  }


  // angulat.json => scirpt []=>  "node_modules/pdfmake/build/vfs_fonts.js" , "node_modules/pdfmake/build/pdfmake.min.js"
  translate(lang: string) {
    this.translateService.use(lang);
  }
}
