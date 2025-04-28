import {Injectable} from '@angular/core';
@Injectable()
export class Config {
  ApiUrl: any;
  GoogleKey: any;

  constructor() {
    const local = {
      ApiUrl: process.env["BASE_URL"],
    };
    const pro = {
        ApiUrl:process.env["BASE_URL"],
    };
    const HostName = window.location.hostname;
    let env;
    if (HostName == 'localhost') {
      env = local.ApiUrl;
    } else {
      env = pro.ApiUrl;
    }

    this.ApiUrl = env;

  }
}
