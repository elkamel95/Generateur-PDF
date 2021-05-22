import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import {ConfigImage} from '../models/ConfigImage'
@Injectable({
  providedIn: 'root'
})
export class DocManagementService   {
 
 

  constructor(private http: HttpClient) {
 
   }
 
  getAll(): Observable<any> {
    return this.http.get(`${environment.URLStream}/documents`);
  }
 
  downLoad(name) {
 window.open(`${environment.URLStream}/downloadFile/${name}`);

   // return this.http.get<Observable<any>>(`${environment.URLStream}/downloadFile/${name}`);
  }
  
  postFile(data: ConfigImage,pdf,image): Observable<any> {
     const formData: FormData = new FormData();
        formData.append('config', new Blob([ JSON.stringify(data) ], {
        type: 'application/json'
      }));
      formData.append('pdf', pdf,pdf.name);
      formData.append('image',image,image.name);
    
    return this.http.post(`${environment.URLStream}/uploadFile`,formData);
}
 
  }
