import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AppService {

  public sliderUrl = null;
  private headers = null;
  public id: any;

  constructor(private http: HttpClient) {


  }


  addImage(logoID, logoPhoto) {
    this.id = logoID;
    this.id = new Date().valueOf();
    let formData = new FormData();
    formData.append('id', this.id);
    formData.append('slider', logoPhoto);

    return this.http.post('https://httpbin.org/status/200', formData).map(res => console.log(res, 'server response'));
  }


}
