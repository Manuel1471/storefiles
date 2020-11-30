import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { FileElement } from '../model/element';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private dataUrl = 'http://localhost:5000/dir/';
  private uploadUrl = 'http://localhost:5000/upload/';

  constructor(public http: HttpClient) {}

  public consultar(dir:string): Observable<any> {
    return this.http.get<any>(this.dataUrl + dir);
  }

  public upload(dir:string, archivo: any): Observable<any> {
    return this.http.post<any>(this.uploadUrl + dir, archivo);
  }
}
